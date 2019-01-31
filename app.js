const express = require('express'),
app = express(),
server = require('http').createServer(app);
port = process.env.PORT || 3000;
const logger = require('morgan');
const session = require('express-session');

const bodyParser= require('body-parser');
const cookieParser = require('cookie-parser');
const path= require('path');

//set template engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//static path to use css files etc
app.use(logger('dev'));

//body parser and cookie parser middleware
app.use(bodyParser.urlencoded({extended: false}));
//parse application json
app.use(bodyParser.json());
//app.use(express.bodyParser({uploadDir:'./uploads'}));

app.use(cookieParser('secret'));

//define static folders u will use
app.use(express.static(path.join(__dirname, 'node_modules')));
//app.use(express.static(path.join(__dirname +'/node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname));

app.use(session({ 
  secret: 'secret',
  resave: true,
  saveUninitialized: true,

    //cookie: { secure:true  }
}));


//call all the routes
let  routes= require('./routes/index');
//let pages = require('./routes/pages');

//let imgupload = require('./routes/upload');
app.use('/', routes);
//app.use('/pages', pages);

server.listen(port, function(req, res) {
    console.log("ok");
    
});

