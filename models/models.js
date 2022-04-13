var builder = require( 'joi-json' ).builder();
var bcrypt = require("bcryptjs");
var saltRounds = 10;

const datoSchema = {
    nombre:{
        type: String,
    },
    apellido:{
        type: String,
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    favNumberOrWord: [
        'string: min=1, max=30',
        'number: min=0, max=100'
    ]
};

builder.build(datoSchema);