import { Schema, model, models } from "mongoose";

const stationSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    plants: [{
        name :{
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        }
    }],
    seedtime: {
        type: String,
        required: true,
        minlength: 8,
        select : true
    },
    description: {
        type: String,
        required: false
    }
},
    {
        timestamps: false,
        versionKey: false,
    }
);

export default models.station || model("station", stationSchema);