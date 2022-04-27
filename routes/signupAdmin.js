var express = require('express');
const createHttpError = require('http-errors');
var router = express.Router();
var { client, dbName } = require('../db/mongo');

const User = require('../models/user.model');
const { authSchema } = require('../validations/user.validation')


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('signupAdmin');
});

router.post("/registro", async (req, res, next) => {

  const result = await authSchema.validateAsync(req.body)

  regUser(result)
    .then(async () => {
      res.render('usersAdmin')
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      client.close;
    })

});


async function regUser(datos) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('Usuarios');

  const users = new User({
    nombre: datos.nombre,
    apellido: datos.apellido,
    email: datos.email,
    password: datos.password
  }
  )

  users.password = await users.encryptPassword(datos.password);

  await collection.insertOne(users)

}



module.exports = router;
