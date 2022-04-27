const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    nombre:{type: String, required:true},   
    apellido:{type: String},   
    email:{type: String, required:true, lowercase:true, unique:true},    
    password:{type: String, required:true}    
},{
    timestamps: true
});


module.exports = model('User',UserSchema); 