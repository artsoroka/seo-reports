var fs = require('fs'),
    express = require('express'); 

var app = express()

var config = {
  port: 80
}


app.use(express.static(__dirname + '/public'));

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
