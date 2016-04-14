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
            db.run("INSERT INTO comments (qId, userId, desc, date) VALUES (?,?,?,?)",
                req.params.id,
                user.id,
                fields.description,
                CURRENT_TIMESTAMP
            );

        });

    }

    show(req, res){

    }

    update(req, res){

    }

    destroy(req, res){
        db.run("DELETE FROM comments WHERE id=?",req.params.id, );
    }
}

module.exports = exports = new Comment();
