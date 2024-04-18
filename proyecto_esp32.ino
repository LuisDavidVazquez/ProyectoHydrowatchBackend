#include "Arduino.h"
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "DHTesp.h"


//Datos del usuario
const char *email = "My Station";
const char *password = "guest";
const char *id_estacion = "847d0573-12c0-4eb9-87b3-8e5dda49ee97";

//Datos de conexion Wifi
const char *ssid = "";
const char *pass = "";

//Datos de conexion mqtt
char *server = "3.94.0.20";
const int mqttPort = 1883;
char *subscribeTopic = "";
char *publishTopic = "esp32.mqtt";
const char *mqttUser = "guest";
const char *mqttPassword = "guest";

//Datos sensor de nivel de agua
int pinLevelWater = A0;
int sensorPower = 4;
int level = 0;

//Datos sensor dht
int pinDHT = 13;
DHTesp dht;
int humedad = 0;
int temperatura = 0;
0
//Datos sensor ph
const int pinPH = 34;
float slope = 14.0 / 3.3;
float intercept = 0.0;
int ph = 0;

WiFiClient espClient;
PubSubClient client(espClient);

// Conectar a Wifi
void connectionWIFI() {

  WiFi.begin(ssid, pass);
  Serial.println();
  Serial.print("Conectando a ");
  Serial.println(ssid);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi conectado");
  Serial.println("Dirección IP obtenida: ");
  Serial.println(WiFi.localIP());
}


//Conectar Rabbitmq
void connectionMQTT() {

  client.setServer(server, mqttPort);
  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");

    if (client.connect("ESP32Client", mqttUser, mqttPassword)) {

      Serial.println("Conectado");

    } else {

      Serial.print("failed with state ");
      Serial.print(client.state());
      Serial.println(" Intentando de nuevo en 5 segundos");
      delay(5000);
    }
  }
}


//Sensor dht
void sensordht() {
  TempAndHumidity data = dht.getTempAndHumidity();
  humedad = data.humidity;
  temperatura = data.temperature;

}


//Nivel de agua
void levelWater() {
  digitalWrite(sensorPower, HIGH);
  delay(10);
  level = analogRead(pinLevelWater);
  digitalWrite(sensorPower, LOW);
}


//Sensor pH
void sensorPH() {
  float value = analogRead(pinPH);
  float voltage = value / 4095.0 * 3.3; 
  ph = slope * voltage + intercept; 
}

//Enviar mensaje
void sendMessage() {
  char buffer[512];

  JsonDocument doc;
  doc["user"]["email"] = email;
  doc["user"]["password"] = password;
  doc["user"]["id_estacion"] = id_estacion;
  doc["humedad"] = humedad;
  doc["temperatura"] = temperatura;
  doc["level_water"] = level;
  doc["nivel_ph"] = ph;
  serializeJson(doc, buffer);
  Serial.println(buffer);

  size_t len = serializeJson(doc, buffer, sizeof(buffer));

  if (client.publish(publishTopic, buffer, len)) {
    Serial.print("Msn enviado exitosamente");
  } else {
    Serial.print("Error en el envio");
  }
  Serial.println();
}

void setup() {

  Serial.begin(115200);

  dht.setup(pinDHT, DHTesp::DHT11);
  pinMode(sensorPower, OUTPUT);
  pinMode(pinPH, INPUT);
  digitalWrite(sensorPower, LOW);
  
  connectionWIFI();
  connectionMQTT();
}

void loop() {
  levelWater();
  sensordht();
  sensorPH();
  sendMessage();
  client.loop();
  delay(5000);
}
