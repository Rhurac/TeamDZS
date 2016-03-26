var express = require('express'),
  app = express(),
  favicon = require('serve-favicon'),
  handlebars = require('express-handlebars').create({ defaultLayout:'main' }),
  sessions = require('client-sessions');
// var db = require('./database/seed');

app.disable('x-powered-by');
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(favicon(__dirname + '/public/images/powercat.png'));
app.use(sessions({
  cookieName: 'session',
  secret: 'somerandomstring',
  duration: 24*60*60*1000,
  activeDuration: 1000*60*5
}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/helpers'));

app.listen(app.get('port'), function(){
  console.log('Express started. Server listening on port 3000. Press Ctrl-C to terminate');
});
