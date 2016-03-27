var db = require('../db');

var index = {

  home: function(req, res){
    res.render('index/home');
  },

  about: function(req, res){
    res.render('index/about');
  },

  contact: function(req, res){
    res.render('index/contact');
  }
};

module.exports = exports = index;
