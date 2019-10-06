const router = require('express').Router()
const passport = require('passport-local')
const Admin = require('../models/admin')

passport.use(new LocalStrategy(
    function(username, password, done) {
      Admin.findOne({ username: username ,password:password}, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));