var builder = require( 'joi-json' ).builder();

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
let schema = builder.build(datoSchema);