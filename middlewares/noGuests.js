"use strict"

function noGuests(req, res, next) {
  console.log(req.session);
  if(!req.user || !req.user.admin)
  res.sendStatus('403');
  else
  return next();
}

module.exports = exports = noGuests;
