import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value : any) {
                // Aquí definimos una expresión regular para validar el dominio del correo electrónico.
                // En este caso, permitiremos las direcciones de correo con dominio @gmail.com, @hotmail.com y @outlook.es.
                const emailPattern = /@(gmail\.com|hotmail\.com|outlook\.es)$/i;
                return emailPattern.test(value);
            },
            message: "El formato del correo electrónico no es válido.",
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select : true
    },
    data: {
        name :{
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        role : {
            type: String,
            required: true,
        }
    }
},
    {
        timestamps: false,
        versionKey: false,
    }
);

export default models.user || model("user", userSchema);