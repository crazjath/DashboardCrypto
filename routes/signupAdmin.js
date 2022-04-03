var express = require('express');
var router = express.Router();
var {client, dbName} = require('../db/mongo');





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
    await collection.insertOne(
      {
        nombre: datos.user,
        apellido: datos.name,
        email: datos.email,
        password: datos.password
      }
    )
   }



module.exports = router;
