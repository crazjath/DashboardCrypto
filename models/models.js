var builder = require( 'joi-json' ).builder();
var bcrypt = require("bcrypt");
var saltRounds = 10;

const datoSchema = {
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    favNumberOrWord: [
        'string: min=1, max=10',
        'number: min=0, max=100'
    ]
};

datoSchema.statics.encryptPassword = async(password) =>{
    const salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(password,salt)
}

datoSchema.statics.comparePassword = async(password,receivedPassword)=>{
    return await bcrypt.compare(password,receivedPassword)
}

let datoSchema = builder.build(datoSchema);