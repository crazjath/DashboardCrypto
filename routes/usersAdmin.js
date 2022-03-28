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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('usersAdmin', { title: 'Express' });
});

module.exports = router;
