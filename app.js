var express = require('express'),
  app = express(),
  path = require('path'),
  favicon = require('serve-favicon'),
  handlebars = require('express-handlebars').create({ defaultLayout:'main' }),
  sessions = require('client-sessions'),
  collateFilteredQuestions = require('./middlewares/collateFilteredQuestions');
// var db = require('./database/seed');

app.disable('x-powered-by');
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(favicon(__dirname + '/public/images/powercat.png'));
app.use(sessions({
  cookieName: 'session',
  secret: 'StarCraftKittens1986',
  duration: 24*60*60*1000,
  activeDuration: 1000*60*5
}));
app.use(express.static(path.join(__dirname, "/client")));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/views")));

var index = require('./controllers/index');
app.get('/login', index.landing);
app.get('/', index.landing);
app.get('/home', collateFilteredQuestions, index.home);
app.get('/about', index.about);
app.get('/contact', index.contact);
// app.get('/users', adminOnly, index.users);

var sessions = require('./controllers/sessions');
app.get('/sessions/new', sessions.new);
app.post('/sessions/create', sessions.create);

app.listen(app.get('port'), function(){
  console.log('Express started. Server listening on port 3000. Press Ctrl-C to terminate');
});
