const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const session = require('express-session')
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
});
app.use('/public', express.static('public'));

app.use(function(req, res, next){
  const users = req.session.users || {"Brandon": "password", "Edwin": "bacon"};
  next();
});
app.get('/', function(req, res, next){
  if

  res.render("login");
});


app.listen(3000, function(){
  console.log("Hey, Listen!")
});
