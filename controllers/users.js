var db = require('../db'),
  formidable = require('formidable'),
  encryption = require("../database/encryption"),
  fs = require("fs");


var users = {
  index: function(req, res){
    db.all("SELECT * FROM users", function(err, all){
      res.render("users/index", {users: all});
    });
  },

  new: function(req, res){
    res.render("users/new", {layout:"landing"});
  },

  create: function(req, res){
    var form = formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
      if(err) return console.error(err);
      var salt = encryption.salt();

      db.serialize(function(){
        db.get("SELECT * FROM users WHERE username = ?", fields.username, function(err, row){
          if(err) return console.error("There was an error while processing your request.");
          if(row){
            return("username");
          }
        });

        db.run("INSERT INTO users (fname, lname, picture, username, email, admin, blocked, password_digest, salt) VALUES (?,?,?,?,?,?,?,?,?)",
        fields.fname,
        fields.lname,
        "/images/zerg.png",
        fields.username,
        fields.email,
        false,
        false,
        encryption.digest(fields.password + salt),
        salt
      );
    });
    return res.redirect("/home");
  });
},

  show: function(req, res){
    db.get("SELECT * FROM users WHERE username = ?", req.query.username, function(err, user){
      if(err) return console.error("Error retrieving data from table users.");
      return res.render("users/show", {user: user});
    });
  },

  update: function(req, res){
    var form = formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
      if(err) return console.error(err);
      db.run("UPDATE users SET username=?, fname=?, lname=?, email=?, admin=?, blocked=?, password_digest=? WHERE id=?",
        fields.username,
        fields.fname,
        fields.lname,
        fields.email,
        fields.admin,
        fields.blocked,
        fields.password,
        function(err){
          if(err) return console.err(err, "Error while updating table users.");
      });
    });
  }
};

module.exports = exports = users;
