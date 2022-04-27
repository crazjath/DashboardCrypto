var express = require('express');
var router = express.Router();
var passport = require('passport');
var {client, dbName} = require("../db/mongo");
var {ObjectId} = require('mongodb')

passport.deserializeUser(
    async function(id, done) {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("Usuarios");
    collection.findOne({_id:ObjectId(id)}, function (err, user) {
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
    res.render('rigsUsuarios', { title: 'Express' });
  });

module.exports = router;