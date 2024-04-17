import mqtt from "mqtt"
import dotenv from 'dotenv'

/* 
    INICIO
    CONFIGURACIONES DE DATOS GENERADOS, !CONFIGURAR!
*/

const decimals = 2

const temperature_range = [24, 30]
const humidity_range = [60, 100]
const water_range = [60, 80]
const ph_range = [5.5, 8.5]

/* 
    FIN
    CONFIGURACIONES DE DATOS GENERADOS, !CONFIGURAR!
*/

dotenv.config()

let delay = parseInt(process.argv[process.argv.length - 1]);
delay = !delay ? (parseInt(process.env["FAKER_DELAY"]) || parseInt(process.env["FAKER_DELAY"]) === 0 ? parseInt(process.env["FAKER_DELAY"]) : 20) : delay;

console.log(delay)

const envs = process.env
const connection_options = {
    protocol: envs["FAKER_PROTOCOL"] ?? "mqtt",
    port: envs["FAKER_PORT"] ?? 1883,
    username: envs["FAKER_USERNAME"] ?? "user",
    password: envs["FAKER_PASSWORD"] ?? 'password',
}

const topic = envs["FAKER_TOPIC"] ?? "PUSH"
const uri = `${envs["FAKER_PROTOCOL"].toLowerCase() ?? "mqtt"}://${envs["FAKER_HOST"]}/`
const client = mqtt.connect(uri, connection_options)
const deviceID = process.env["FAKER_DEVICE_ID"] ?? "dummy_id"

client.on('connect', () => {
    console.log("Conexión establecida con el broker.")

    function spam() {
        setTimeout(spam, delay * 1000)
        console.log("Intentado envíar mensaje al tema: " + topic)

        const request = {
            user: {
                email: "user",
                password: "pass",
                device: deviceID,
            },
            humedad: parseFloat(randomFrom(humidity_range)),
            temperature: parseFloat(randomFrom(temperature_range)),
            level_water: parseFloat(randomFrom(water_range)),
            nivel_ph: parseFloat(randomFrom(ph_range)),
        }

        client.publish(topic, JSON.stringify(request), { qos: 0, retain: false }, (error) => {
            if (error) {
                console.log("No se pudo completar la solicitud...")
                console.error(error)
                return
            }
            console.log("¡Mensaje enviado!")
        })
    }

    spam()
})

client.on('error', (error) => {
    console.log("Ha ocurrido un error tratando de establecer conexión con el broker.")
    console.error(error)
})

function randomFrom([min, max]) {
    return (Math.random() * (max - min) + min).toFixed(decimals || 2);
}