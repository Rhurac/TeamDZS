"use strict"
var db = require('../db'),
  formidable = require('formidable'),
  encryption = require("../database/encryption"),
  fs = require("fs");


class User {
  index(req, res){
    db.all("SELECT * FROM users", function(err, all){
      res.render("users/index", {users: all});
    });
  }

  new(req, res){
    res.render("users/new", {layout:"landing"});
  }

  create(req, res){
    var form = formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
      console.log("foo");
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
}

  show(req, res){
    db.get("SELECT * FROM users WHERE username = ?", req.query.username, function(err, user){
      if(err) return console.error("Error retrieving data from table users.");
      return res.render("users/show", {user: user});
    });
  }

  update(req, res){
    var form = formidable.IncomingForm();
    var path = "";
    var parent = "";
    var name = "";
    console.log(form);
    form.on("file", function(field, file){
      form.uploadDir = __dirname + "/../public/images";
      console.log(form.uploadDir);
      path = file.path;
      parent = file.path.split("upload")[0];
      name = file.name;
      req.resume();
    });
    form.on("error", function(err){
      console.log("An error has occurred during the form upload.");
      console.error(err);
      req.resume();
    });
    form.on("aborted", function(err){
      console.log("User aborted the upload.");
      console.log(err);
      req.resume();
    });
    form.on("end", function(){
      console.log("upload complete");
      req.resume();
    });
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
        req.params.id,
        function(err){
          if(err) return console.err(err, "Error while updating table users.");
          fs.renameSync(path, parent + name);
          return res.redirect("/users/index");
      });
    });
  }
}

module.exports = exports = new User();
