import amqp from "amqplib/callback_api.js";
import dotenv from "dotenv";
import recordModel from "./database/manager.js";

dotenv.config();

const brokerAddress = process.env.AMQP_BROKER_HOST || "amqp://localhost";
const queueName = process.env.AMQP_QUEUE_NAME || "queue";
const notifyQueueName = "notify"; // Nueva cola para los mensajes de notificación

let channel;

const handleMessage = async (msg) => {
  try {
    const message = msg.content.toString();
    const messageParsed = JSON.parse(message);
    console.log(message);

    // Crear la cola de notificación y publicar el mensaje en ella
    channel.assertQueue(notifyQueueName, { durable: true }, async (error, ok) => {
      if (error) {
        console.error("Error asserting notify queue:", error.message);
        return;
      }

      // Publicar el mensaje en la cola de notificación
      channel.sendToQueue(notifyQueueName, Buffer.from(message), { persistent: true });

      // Guardar el registro en la base de datos
      const log = new recordModel({
        humedad: messageParsed.humedad,
        temperature: messageParsed.temperature,
        level_water: messageParsed.level_water,
        nivel_ph: messageParsed.nivel_ph,
        station: messageParsed.user.device
      });
      await log.save();
      console.log(`Message sent to notify queue: ${message}`);
    });
  } catch (error) {
    console.error("Error handling message:", error.message);
  }
};

const connectToBroker = () => {
  amqp.connect(brokerAddress, (error, connection) => {
    if (error) {
      console.error("Error connecting to AMQP broker:", error.message);
      return;
    }

    console.log("Connected to AMQP broker");

    connection.createChannel((error, ch) => {
      if (error) {
        console.error("Error creating channel:", error.message);
        return;
      }

      channel = ch;

      channel.assertQueue(queueName, { durable: true }, (error, ok) => {
        if (error) {
          console.error("Error asserting queue:", error.message);
          return;
        }

        channel.consume(queueName, handleMessage, { noAck: true }, (error, ok) => {
          if (error) {
            console.error("Error consuming messages:", error.message);
            return;
          }

          console.log(`Consuming messages from queue '${queueName}'`);
        });
      });
    });
  });
};

connectToBroker();
