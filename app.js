var fs = require('fs'); 
var util = require('util'); 

var express = require('express'),
    app = express(),
    home = express(); 

var cookieParser = require('cookie-parser')

var config = {
  port: 80
}

checkAuth = function(req,res,next){
  if(req.cookies && req.cookies.auth) return next(); 
  res.send('you need to be logged in to view this page');  
}

app.use(express.static(__dirname + '/public'));
app.use(cookieParser()); 

app.use('/home', home); 
home.all('*', checkAuth); 


home.get('/', function(req,res){
  res.send('home'); 
}); 

var indexPage = fs.readFileSync('./views/index.htm'); 
var loginPage = fs.readFileSync('./views/login.htm'); 

app.get('/', function (req, res) {
  res.set({
    'Content-Type': 'text/html' 
  }); 
  res.send(indexPage); 
}); 

app.get('/login/yandex', function(req,res){
  res.set({
    'Content-Type': 'text/html' 
  })
  res.send(loginPage);  
}); 

var server = app.listen(config.port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

}); 
