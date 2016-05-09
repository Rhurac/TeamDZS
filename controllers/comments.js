"use strict"
var db = require('../db'),
    formidable = require("formidable");

class Comment{

    new(req, res){
        res.render("");
    }

    create(req, res){
        var form = formidable.IncomingForm();
        form.parse(req, (err, fields, files) =>{
            if(err){
                res.sendStatus(500);
                return console.error("Error in Comment create.\n",err);
            }
            db.run("INSERT INTO comments (qId, userId, desc, date) VALUES (?,?,?,CURRENT_TIMESTAMP)",
                req.params.id,
                user.id,
                fields.description,
            ()=>{
                res.redirect('back');
            });

        });

    }

    show(req, res){

    }

    update(req, res){
      var form = formidable.IncomingForm();
      form.parse(req, function(err, fields, files){
        if (err) return console.error(err, "Unable to retrieve incoming form");
        console.log(fields);
        var id = fields.id;
        var answer = fields.answer;
        db.run("INSERT INTO comments (qid, userid, desc, course, repliedTo, date) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP)",
          fields.qid,
          fields.user_id,
          fields.desc,
          fields.course,
          fields.repliedTo,
          function(err){
            if (err) return console.error(err, "Unable to insert data into table comments");
            var url = "/questions/CIS" + fields.course.split(" ")[1] + "/new";
            res.redirect(url);
          });
      });

    }

    delete(req, res){
        db.run("DELETE FROM comments WHERE id=?",req.params.cID);
        // "/questions/"+req.params.qID+"/comments"
        res.redirect('back');
    }
}

module.exports = exports = new Comment();
