"use strict"
var db = require('../db');
var formidable = require('formidable');

class Chat{

  landing(req, res){
    res.render('index/landing', { layout: "landing"});
  }
//// TABLE QUESTIONS: id, course, rating, numOfReviews, shortdesc, desc, answeredBy, date, userid
  chat(req, res){
    res.render('chat/chat');
  }
}

module.exports = exports = new Chat();
