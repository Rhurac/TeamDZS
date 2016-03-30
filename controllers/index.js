var db = require('../db');

var index = {

  home: function(req, res){
    db.all('SELECT * FROM questions ORDER BY rating DESC', function(err, allQuestions){
      // need req.session.user here; this is a dummy value for now
      var username = 'sagar5589';
      db.all('SELECT * FROM questions WHERE author = ?', username, function(err, myQuestions){
        db.get('SELECT picture FROM users WHERE username = ?', username, function(err, data){
          var picture = data.picture;
          res.render('index/home', { username: username, picture: picture, questions: allQuestions, myQuestions: myQuestions });
        });
      });
    });
  },

  about: function(req, res){
    res.render('index/about');
  },

  contact: function(req, res){
    res.render('index/contact');
  }
};

module.exports = exports = index;
