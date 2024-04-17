import mongoose from 'mongoose'
import dotenv from 'dotenv'

let connection = null
let recordSchema = null
let recordModel = null

dotenv.config()

const URLMONGO = process.env["MONGO_URI"] ?? "mongodb://user:pass@127.0.0.1/"
const DATABASE = process.env["MONGO_DATABASE"] ?? "test"

try {
    connection = await mongoose.connect(URLMONGO, {dbName: DATABASE})
    recordSchema = new mongoose.Schema({
        humedad: Number,
        temperature: Number,
        level_water: Number,
        nivel_ph: Number,
        station: String
    });
    recordModel = new mongoose.model('records', recordSchema)
} catch (error) {
    console.log("Ha ocurrido un error al intentar conectarse a la base de datos.")
    console.error(error)
}

export default recordModel