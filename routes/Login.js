var express = require('express');
var router = express.Router();
var {client, dbName} = require("../db/mongo");
var passport = require('passport');
var LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(
    async function(username, password, done) {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection("Usuarios");
      await collection.findOne({ email: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (user.password!==password) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('Login', { title: 'Login' });
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    if(req.user.Profile==='admin'){
      res.redirect('/admin/Inicio');
    }
    else{
      res.redirect('/usuario/Inicio');
    }
  });

  /* async function ValidarUsuario(dato){
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("Usuarios");
    let result = await collection.aggregate([
        {$match: {email: dato.username}},
        {$project: {_id: 0, Profile:1}}
    ]).toArray();
    console.log(result[0]);
  }; */


module.exports = router;