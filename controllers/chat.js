"use strict"
var db = require('../db');

class Chat{

  chat(req, res){
    db.get("SELECT username FROM users WHERE id = ?", req.session.user_id, function(err, username){
      if(err) console.log(err, "Error while searching table users.");
      username = username.username;
      //username = req.session.username;
      res.render('chat/chat', {user: username});
      //res.render('chat/chat');
      console.log("My username, ",username);
        });
      }
    }

module.exports = exports = new Chat();
