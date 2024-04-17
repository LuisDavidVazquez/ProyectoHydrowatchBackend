import mongoose from 'mongoose'

let connection = null
let recordSchema = null
let recordModel = null

try {
    connection = await mongoose.connect("mongodb://admin:root123@127.0.0.1:27017/", {dbName: 'hidroponia'})
    recordSchema = new mongoose.Schema({
        humedad: Number,
        temperature: Number,
        level_water: Number,
        nivel_ph: Number
    });
    recordModel = new mongoose.model('records', recordSchema)
} catch (error) {
    console.log("Ha ocurrido un error al intentar conectarse a la base de datos.")
    console.error(error)
}

export default recordModel