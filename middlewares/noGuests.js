"use strict"

function noGuests(req, res, next) {
  console.log(req.session);
  if(!req.user || !req.user.admin)
  // res.sendStatus('403');
  res.render("error/noGuest",{layout:"error", message:"You must be logged in."});
  else
  return next();
}

module.exports = exports = noGuests;
