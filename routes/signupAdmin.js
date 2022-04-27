var express = require('express');
const createHttpError = require('http-errors');
var router = express.Router();
var {ObjectId} = require('mongodb')
var { client, dbName } = require('../db/mongo');
var passport = require('passport');

const User = require('../models/user.model');
const { authSchema } = require('../validations/user.validation');
const bcrypt = require('bcryptjs');

passport.deserializeUser(
  async function(id, done) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("Usuarios");
  collection.findOne({_id: ObjectId(id)}, function (err, user) {
    console.log(user)
    done(err, user);
  });
});


/* GET users listing. */
router.get('/',function(req, res, next){
  if (req.isAuthenticated()) {
    return next();
} else {
    res.redirect('/')
}
}, function(req, res, next) {
  if(req.user.Profile==="admin"){
    res.render('signupAdmin', { title: 'Express' });
  }
  else{
    res.redirect('/usuario/inicio')
  }
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
  const hashUserPassword = await bcrypt.hash(datos.password, 10)

  const users = new User({
    nombre: datos.nombre,
    apellido: datos.apellido,
    email: datos.email,
    password: hashUserPassword
  }
  )



  await collection.insertOne(users)

}



module.exports = router;
