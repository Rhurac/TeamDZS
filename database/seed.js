var sqlite3 = require('sqlite3'),
    db = require('../db'),
    encryption = require('./encryption');

// Create the database schema and populate
db.serialize(function() {

  // TABLE USERS: id, username, fname, lname, picture, email, admin, blocked, password_digest, salt
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE  COLLATE NOCASE, fname TEXT NOT NULL, lname TEXT NOT NULL, picture TEXT, email TEXT, admin BOOLEAN, blocked BOOLEAN, password_digest TEXT, salt TEXT)");

  // TABLE QUESTIONS: id, course, rating, numOfReviews, shortdesc, desc, answeredBy, date, userid
  db.run("CREATE TABLE IF NOT EXISTS Questions(id INTEGER PRIMARY KEY, course VARCHAR(6), rating INTEGER, numOfReviews INTEGER, shortdesc TEXT NOT NULL, desc TEXT NOT NULL, answeredBy TEXT, author TEXT NOT NULL, date TEXT NOT NULL, FOREIGN KEY(author) REFERENCES users(id))");

  // TABLE COMMENTS: id, qid, userid, body, date
  db.run("CREATE TABLE IF NOT EXISTS Comments(id INTEGER PRIMARY KEY, qid INTEGER NOT NULL, userid INTEGER, desc TEXT NOT NULL, date TEXT NOT NULL, FOREIGN KEY(userid) REFERENCES users(id), FOREIGN KEY(qid) REFERENCES Questions(id))");


  // ******* Create some test data ********
  db.run("INSERT INTO Questions (course, rating, numOfReviews, shortdesc, desc, answeredBy, date, author) VALUES ('CIS 526', 5, 3, 'Why is the sky blue?', 'Hello Universe', 'sagar5589', CURRENT_TIMESTAMP, 'djbamba')");

  db.run("INSERT INTO Questions (course, rating, numOfReviews, shortdesc, desc, answeredBy, date, author) VALUES ('CIS 527', 4, 2, 'How far to the moon?', 'Hello Universe', 'sagar5589', CURRENT_TIMESTAMP, 'djbamba')");

  db.run("INSERT INTO Questions (course, rating, numOfReviews, shortdesc, desc, answeredBy, date, author) VALUES ('CIS 526', 4, 1, 'How hot is the sun?', 'Hello Universe', 'djbamba', CURRENT_TIMESTAMP, 'sagar5589')");

  db.run("INSERT INTO Questions (course, rating, numOfReviews, shortdesc, desc, answeredBy, date, author) VALUES ('CIS 526', 5, 3, 'How old is Sigourney Weaver?', 'Hello Universe', 'djbamba', CURRENT_TIMESTAMP, 'sagar5589')");


  // TABLE USERS: id, username, fname, lname, picture, email, admin, blocked, password_digest, salt
  var salt = encryption.salt();
   db.run("INSERT INTO users (username, fname, lname, picture, email, admin, blocked, password_digest, salt) VALUES (?,?,?,?,?,?,?,?,?)",
    'sagar5589',
    'Sagar',
    'Mehta',
    '/images/zerg.png',
    'sagar5589@ksu.edu',
    true,
    false,
    encryption.digest('123456' + salt),
    salt
  );
});
