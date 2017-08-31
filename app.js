var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

// configure app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// use middleware
app.use(express.static(path.join(__dirname, 'bower_components')))
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// **** define routes ****
var todoRoutes = require('./todos');
app.use(require('./todos'));

app.listen(8080, function(){
	console.log('ready for port 8080');
})


/*var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080*/