"use strict"

function admin_only(req, res, next) {
  console.log(req.session);
  if(req.user && req.user.admin) return next();
  else res.sendStatus('403');
}

module.exports = exports = admin_only;
