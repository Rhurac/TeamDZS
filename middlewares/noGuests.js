"use strict"

function noGuests(req, res, next) {
  console.log(req.session);
  if(!req.user || !req.user.admin)
  return res.render('sessions/new', {message: "You must be signed in to access this page", user: req.user});
  //res.sendStatus('403');
  else
  return next();
}

module.exports = exports = noGuests;
