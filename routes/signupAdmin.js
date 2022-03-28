var express = require('express');
var router = express.Router();
var {client, dbname, dbName} = require('../db/mongo');
var passport = require('passport');
var LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(
    async function(username, password, done) {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('Usuarios');
      collection.findOne({ usuario: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signupAdmin', { title: 'Express' });
});

router.post("/registro", function (req,res,next){
    regUser(req.body)
    .then(()=>{
      res.render('signupAdmin', {info: "Me registre correctamente"})
    })
    .catch((err)=>{
     console.log(err);
    })
    .finally(()=>{
      client.close;
    })
  });
module.exports = router;
