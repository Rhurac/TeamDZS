var sqlite3 = require('sqlite3'),
    db = new sqlite3.Database('data.sqlite3'),
    encryption = require('./encryption');

// Create the database schema and populate
db.serialize(function() {

  // Users: id, username, fname, lname, email, admin, blocked, password_digest, salt
  db.run("CREATE TABLE if not exists users (id INTEGER PRIMARY KEY, username TEXT UNIQUE  COLLATE NOCASE, fname TEXT NOT NULL, lname TEXT NOT NULL, email TEXT, admin BOOLEAN, blocked BOOLEAN, password_digest TEXT, salt TEXT)");

  // creating a default user
  var salt = encryption.salt();
   db.run("INSERT INTO users (username, fname, lname, admin, blocked, password_digest, salt) values (?,?,?,?,?,?,?)",
    'sagar5589',
    'Sagar',
    'Mehta',
    true,
    false,
    encryption.digest('123456' + salt),
    salt
  );

  db.each("SELECT * FROM users", function(err, row){
    if(err) return console.error(err);
  });

  // Questions: id, body, date, userid
  // Comment: id, qid, userid, body, date
  db.run("CREATE TABLE if not exists Questions(id INTEGER PRIMARY KEY, course VARCHAR(6), body TEXT NOT NULL, date TEXT NOT NULL, userid INTEGER,  FOREIGN KEY(userid) REFERENCES users(id))");
  db.run("CREATE TABLE if not exists Comment(id INTEGER PRIMARY KEY, qid INTEGER NOT NULL, userid INTEGER, body TEXT, date TEXT NOT NULL, FOREIGN KEY(userid) REFERENCES users(id), FOREIGN KEY(qid) REFERENCES Questions(id))");



  // Log contents of equipment table to the console
  db.each("SELECT * FROM users", function(err, row){
    if(err) return console.error(err);
    console.log(row);
  });

});
