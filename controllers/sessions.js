"use strict"
var db = require('../db'),
  formidable = require('formidable'),
  encryption = require('../database/encryption');

class Session {
  new(req, res){
    res.render("sessions/new", {layout: "landing"});
  }

  create(req, res){
    req.session.reset();
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
      if(err) return res.sendStatus(500);
      db.get("SELECT * FROM users WHERE email = ?", fields.email, function(err, user){
    //    console.log(encryption.digest(fields.password + user.salt));
        if(err) return res.render('sessions/new', {layout:"landing",message: "Email/Password1 combination not found.", user: req.user});
        if(!user) return res.render('sessions/new', {layout:"landing",message: "Email/Password2 combination not found.", user: req.user});
        if(user.password_digest != encryption.digest(fields.password + user.salt)) return res.render('sessions/new', {layout:"landing",message: "Email/Password3 combination not found.", user: req.user});
        req.session.user_id = user.id;
        return res.redirect('/home');
      });
    });
  }
}

module.exports = exports = new Session();
