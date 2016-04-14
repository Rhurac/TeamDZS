"use strict"
var db = require('../db'),
  formidable = require('formidable'),
  encryption = require("../database/encryption"),
  fs = require("fs-extra");



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
    var salt = encryption.salt();
    var fields = res.locals.fields;
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
    res.render("index/landing", {layout: "landing", message: "User " + fields.username + " created!"});
    // return res.redirect("/sessions/delete");
}

  show(req, res){
    db.get("SELECT * FROM users WHERE username = ?", req.query.username, function(err, user){
      if(err) return console.error("Error retrieving data from table users.");
      return res.render("users/show", {user: user});
    });
  }

  update(req, res){
    var form = formidable.IncomingForm();
    var file_name;
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
    form.on("end", function(fields, files) {
      var temp_path = this.openedFiles[0].path;
      file_name = this.openedFiles[0].name;
      // var file_name = this.openedFiles[0].path.split("tmp")[0] + this.openedFiles[0].name;
      var new_location = __dirname + "/../public/images/";
      fs.copy(temp_path, new_location + file_name, function(err) {
        if(err) console.error(err);
      });
      return;
    });
    form.parse(req, function(err, fields, files){
      if(err) return console.error(err);
      db.run("UPDATE users SET username=?, fname=?, lname=?, picture=?, email=?, admin=?, blocked=?, password_digest=? WHERE id=?",
        fields.username,
        fields.fname,
        fields.lname,
        file_name,
        fields.email,
        fields.admin,
        fields.blocked,
        fields.password,
        req.params.id,
        function(err){
          if(err) return console.err(err, "Error while updating table users.");
          // fs.renameSync(path, parent + name);
          return res.redirect("/users/index");
      });
    });
  }
}

module.exports = exports = new User();
