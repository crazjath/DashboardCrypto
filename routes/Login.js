var express = require('express');
var router = express.Router();
var {Client, dbName, client} = require("../db/mongo");
var passport = require('passport');
var LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('Login', { title: 'Express' });
});

router.post('/login',function(req, res, next){
        ValidarUsuario(req.body);

},
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

  async function ValidarUsuario(dato){
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("Usuarios");
    let result = await collection.aggregate([
        {$match: {email: dato.username}},
        {$project: {_id: 0, Profile:1}}
    ]).toArray();
    console.log(result[0]);
  };

module.exports = router;