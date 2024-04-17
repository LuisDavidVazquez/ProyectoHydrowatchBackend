import amqp from "amqplib/callback_api.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dote from 'dotenv'

dote.config()

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const brokerAddress = process.env.AMQP_BROKER_HOST || "amqp://localhost";
const notifyQueueName = "notify";

io.on("connection", (socket) => {
  console.log("A user connected");

  // Conectar al broker y esperar mensajes en la cola "notify"
  amqp.connect(brokerAddress, (error, connection) => {
    if (error) {
      console.error("Error connecting to AMQP broker:", error.message);
      return;
    }

    connection.createChannel((error, channel) => {
      if (error) {
        console.error("Error creating channel:", error.message);
        return;
      }

      channel.assertQueue(notifyQueueName, { durable: true }, (error, ok) => {
        if (error) {
          console.error("Error asserting queue:", error.message);
          return;
        }

        // Esperar mensajes en la cola "notify"
        channel.consume(notifyQueueName, (msg) => {
          if (msg !== null) {
            const data = msg.content.toString();
            console.log("Informacion Recibida:", data);
            io.emit("IncomingData", data);
          }
        }, { noAck: true });
      });
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const port = 5555;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});