#!/usr/bin/env node

/**
 * Created by Jamshaid
 */


logger = require("../helpers/logger");
var express = require('express');
var app = express(); // Init Express APP
var server = require('http').Server(app); 
const cors = require('cors');
var device = require('express-device');
mailer = require('express-mailer');
config = require('dotenv').config();
path = require('path');
fs = require('fs');
crypto = require('crypto');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var passport = require('passport'); // Password for Auth
var cookieParser = require('cookie-parser'); // Parse Cookies
var request = require('request');
require('../config/connect-mongoose');
require('../models');
var mongoose = require("mongoose");
var AC = mongoose.model("AC");

app.use(device.capture());

// Initialize firebase admin
//require("../config/init-firebase-admin");

//var serverPort = process.env.SERVER_PORT ; // local run



app.set('port', process.env.PORT || 8080); //uncomment these 2 lines for live deployment
var serverPort = app.get('port') // live

app.set('views', path.join(__dirname, '../views'));

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, '../../public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"))
})

app.use(bodyParser({keepExtensions: true, uploadDir: path.join(__dirname, '../public/uploads')}));
app.use(cors());

base_url = '';
clientURL = '';

project = {
    title: 'Coming Soon App',
    description: 'Coming Soon App Server'
};

mailer.extend(app, {
    from: process.env.MAILER_USER,
    host: process.env.MAILER_HOST, // hostname
    secureConnection: true, // use SSL
    port: process.env.MAILER_PORT, // port for secure SMTP
    transportMethod: process.env.MAILER_METHOD, // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
    }
});

// Middleware 
app.use(function (req, res, next) {
    /* AC.find({}, function(err, acs) {
    ac = acs[0];
    if (!ac || ((req.url.split("/")[2] === "as") && !ac.as) || ac.as) {
            
        }
    }) */

    base_url = process.env.BASE_URL;
            clientURL = process.env.CLIENT_URL;

            // Website you wish to allow to connect
            // res.setHeader('Access-Control-Allow-Origin', clientURL);
            res.setHeader('Access-Control-Allow-Origin', '*');
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,token');

            // res.setHeader('Access-Control-Allow-Credentials', true);
            // Set Content Type
            res.setHeader('Content-Type', 'Application/JSON');

            // console.log("Request Method : "+req.method);

            if(req.method==='OPTIONS') {
                // prefligh request 
                res.send();
            } else {
                // Pass to next layer of middleware
                next();
            }

});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message": err.name + ": " + err.message});
    }
});

app.use(bodyParser.json());       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(cookieParser());

//this below 2 lines have to be uncommented for chat app
//var socketModule = require('../controllers/socket.controller');
//socketModule.controller(server);


var route = require('../routes');
app.use(route);
if (config.NODE_ENV === 'development') {
    console.log('developement called')
    // app.use(function (err, req, res, next) {
    // });
}

// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        error: {code: err.code, msg: err.message}
    });
});

server.listen(serverPort);

module.exports = app;
console.info("Listening on Port: " + serverPort);

/**
 * Listen on provided port, on all network interfaces.
 */

server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof serverPort === 'string'
        ? 'Pipe ' + serverPort
        : 'Port ' + serverPort;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */



function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    logger.info('Listening on ' + bind);
}
