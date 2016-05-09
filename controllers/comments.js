"use strict"
var db = require('../db'),
    formidable = require("formidable"),
    session = require("client-sessions");

class Comment{
    create(req, res){
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) =>{
            if(err){
                res.sendStatus(500);
                return console.error("Error in Comment create.\n",err);
            }
            db.run("INSERT INTO comments (qId, userId, desc, course, repliedTo, date) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP)",
                req.params.questionID,
                req.session.user_id,
                fields.comment,
                fields.course,
                fields.user,
            (err, data)=>{
                if (err) console.error(err);
                console.log("Made it out of comment/qid POST");
                return res.redirect('back')
            });
        });
    }

    allComments(req, res){
        db.all("SELECT * FROM comments WHERE qid=?", req.params.questionID, (err, comments)=>{
            if(err){res.sendStatus(500); console.error(err);}
            comments.forEach((comment)=>{
                if(comment.userid === req.session.user_id){
                    comment.show = true;
                }

                console.log(JSON.stringify(comments));
                return;
            });

            return res.render("comments/forQuestions",{layout:"comments", comments:comments});
        });
    }

    update(req, res){
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) =>{
            if(err) return console.error(err);
            db.run("UPDATE comments SET desc=? WHERE id=?",
                fields.comment,
                req.commentID,
                (err, success)=>{
                if(err) return console.log(err);
                res.redirect('back');
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
