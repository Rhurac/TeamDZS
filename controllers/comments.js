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
            );

        });

    }

    show(req, res){

    }

    update(req, res){

    }

    delete(req, res){
        db.run("DELETE FROM comments WHERE id=?",req.params.cID);
        res.redirect("/questions/"+req.params.qID+"/comments");
    }
}

module.exports = exports = new Comment();
