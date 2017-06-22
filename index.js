const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static('public'));

app.use(function(req, res, next){
  req.session.users = {admin: "password", Edwin: "bacon1", Josh: "apple"};
  next();
});
app.get('/', function(req, res, next){
  if(req.session.username){
    res.send("Hello " + req.session.username)
  } else
    res.render("login")
});
app.post("/", function(req, res, next){
  if (req.session.users[req.body.username] === req.body.password){
    req.session.users = req.body.username;
    res.send("Hello " + req.body.username);
  } else {
    res.redirect("/");
  }
});

app.listen(3000, function(){
  console.log("Hey, Listen!")
});
