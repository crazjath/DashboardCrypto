const Joi = require('@hapi/joi')

const authSchema = Joi.object({
    nombre: Joi.string().required(),
    apellido: Joi.string(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required()
  })
  
  module.exports = {authSchema}