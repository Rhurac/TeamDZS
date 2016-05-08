"use strict"
var db = require('../db');

class Chat{

  chat(req, res){
    db.get("SELECT * FROM users WHERE id = ?", req.session.user_id, function(err, username){
      // console.log("check, ", username);
      if(err) console.log(err, "Error while searching table users.");
      username = username.username;
      //username = req.session.username;
      res.render('chat/chat', {username: username});
      //res.render('chat/chat');
      console.log("Username: ",username);
        });
      }
}
/*  userList(req,res){
    db.get("SELECT username FROM users WHERE id = ?", req.session.user_id, function(err, username){
      if(err) console.log(err, "Error while searching table users.");
      username = username.username;
      //username = req.session.username;
      res.render('chat/chat', {user: username});
  }
} */

module.exports = exports = new Chat();
