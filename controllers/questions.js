"use strict"
var db = require('../db');
var formidable = require('formidable');

class Question{
  update(req, res){
    console.log("foo");
    var form = formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
      console.log(fields);
    });
    res.redirect("/questions/CIS300");
  }
  create(req, res){
    var form = formidable.IncomingForm();
    var fields = res.locals.fields;
    var url = req.url;
    var courseID = "CIS "+req.params.courseID;
    var redirectID = "CIS"+req.params.courseID;
    //var course = db.get("SELECT ")
    console.log("i am in create: ", req.params.courseID);

    form.parse(req, function(err, fields, files){
      if(err) res.sendStatus(500);
      db.run("INSERT INTO QUESTIONS (course, desc, shortdesc, date, author) VALUES (?,?,?,CURRENT_TIMESTAMP,?)",
      courseID,
      fields.question,
      fields.short,
      req.user.username
      );
      res.redirect("/questions/"+redirectID);
    })
    //res.render("questions/new");
    //return res.redirect("/questions/"+fields.course);
}
// //// TABLE QUESTIONS: id, course, rating, numOfReviews, shortdesc, desc, answeredBy, date, userid
//  new(req, res){
//    console.log("I am in new (questions)", req.url);
//    var urlLength = req.url.length ;// questions/CIS301
//    var tempCourse = req.url.slice(urlLength-3, urlLength);
//    var course = "CIS "+tempCourse;
//    db.all("SELECT * FROM QUESTIONS WHERE course = ?", course, function(err, questions){
//      //if(err) res.sendStatus(500);
//      res.render('questions/new', {courseID:tempCourse,questions:questions});
//   });
//      //console.log("Course:",course);
//      //res.render("questions/new",{courseID:tempCourse},{questions:questions});
//  }

  new(req, res){
    var urlLength = req.url.length ;// questions/CIS301
    var tempCourse = req.url.slice(urlLength-3, urlLength);
    var course = "CIS "+tempCourse;
    db.get("SELECT username FROM users WHERE id = ?", req.session.user_id, function(err, username){
      if(err) console.log(err, "Error while searching table users.");
      username = username.username;
      db.all('SELECT * FROM questions WHERE author = ?', username, function(err, myQuestions){
        db.get('SELECT picture FROM users WHERE username = ?', username, function(err, data){
          var picture = data.picture;
          db.all("SELECT * FROM questions WHERE course = ?", course, function(err, questions){
            res.render('questions/new', { courseID:tempCourse, username: username, picture: picture, questions: questions, myQuestions: myQuestions });
          });
        });
      });
    });
  }




}

module.exports = exports = new Question();
