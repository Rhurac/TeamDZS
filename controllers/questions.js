"use strict"
var db = require('../db');
var formidable = require('formidable');

class Question{

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
//// TABLE QUESTIONS: id, course, rating, numOfReviews, shortdesc, desc, answeredBy, date, userid
 new(req, res){
   console.log("I am in new (questions)", req.url);
   var urlLength = req.url.length ;// questions/CIS301
   var tempCourse = req.url.slice(urlLength-3, urlLength);
   var course = "CIS "+tempCourse;
   db.all("SELECT * FROM QUESTIONS WHERE course = ?", course, function(err, questions){
     //if(err) res.sendStatus(500);
     res.render('questions/new', {courseID:tempCourse,questions:questions});
  });
     //console.log("Course:",course);
     //res.render("questions/new",{courseID:tempCourse},{questions:questions});
 }
}

module.exports = exports = new Question();
