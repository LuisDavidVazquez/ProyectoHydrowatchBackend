import { Schema, model, models } from "mongoose";

const recordSchema = new Schema({
  humedad: Number,
  temperature: Number,
  level_water: Number,
  nivel_ph: Number,
  station: String,
});

const RecordModel =  model("records", recordSchema);
export default RecordModel;