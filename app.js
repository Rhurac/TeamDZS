var express = require('express'),
  app = express(),
  path = require('path'),
  favicon = require('serve-favicon'),
  handlebars = require('express-handlebars').create({ defaultLayout:'main' }),
  sessions = require('client-sessions'),
  collateFilteredQuestions = require('./middlewares/collateFilteredQuestions'),
  check_if_user_exists = require("./middlewares/check_if_user_exists"),
  admin_only = require("./middlewares/admin_only"),
  load_user = require("./middlewares/load_user");
// var db = require('./database/seed');

app.disable('x-powered-by');
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(favicon(__dirname + '/public/images/website_logo.png'));
app.use(sessions({
  cookieName: 'session',
  secret: 'StarCraftKittens1986',
  duration: 24*60*60*1000,
  activeDuration: 1000*60*5
}));
app.use(express.static(path.join(__dirname, "/client")));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/views")));
app.use(function(req, res, next) { res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'); next(); });
app.use(load_user);

var index = require('./controllers/index');
app.get('/login', index.landing);
app.get('/', index.landing);
app.get('/home', collateFilteredQuestions, index.home);
app.get('/about', index.about);
app.get('/contact', index.contact);

var sessions = require('./controllers/sessions');
app.get('/sessions/new', sessions.new);
app.post('/sessions/create', sessions.create);
app.get("/sessions/delete", sessions.delete);

var users = require("./controllers/users");
app.get("/users/index", admin_only, users.index);
app.get("/users/new", users.new);
app.post("/users/create", check_if_user_exists, users.create);
app.get("/users/show", admin_only, users.show);
app.post("/users/:id/update", users.update);
app.get("/users/:id/delete", admin_only, users.delete);

app.listen(app.get('port'), function(){
  console.log('Express started. Server listening on port 3000. Press Ctrl-C to terminate');
});
