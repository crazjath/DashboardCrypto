var express = require('express');
var router = express.Router();
var {client, dbName} = require('../db/mongo');
var User = require('../models/models');

const bcrypt = require('bcryptjs')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signupAdmin');
});

router.post("/registro", function (req,res,next){
    regUser(req.body)
    .then(()=>{
      res.render('usersAdmin')
    })
    .catch((err)=>{
     console.log(err);
    })
    .finally(()=>{
      client.close;
    })
  });


async function regUser(datos){
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('Usuarios');

    const hashUserPassword = await bcrypt.hash(datos.password, 10)

    await collection.insertOne(
      {
        nombre: datos.user,
        apellido: datos.name,
        email: datos.email,
        password: hashUserPassword
      }
    )
   }



module.exports = router;
