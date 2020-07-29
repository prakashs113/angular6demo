var config = require('./config');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require("mysql");
var url = require('url');
var bodyParser = require('body-parser');

function supportCrossOriginScript(req, res, next) {
    res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
}

var app = express();
//initialize config variables
var viewpath = config.app.views; // setting webui tree location.
var securedpath = config.app.securedpath;
console.log('--------------------->' + securedpath);



app.use(function (req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    //    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, config.app.views)));



app.get('/', function (req, res) {

    res.sendStatus(200);
});





var pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    multipleStatements: true,
    connectionLimit: 250,
    queueLimit: 0,
    debug: true
});
function DBPoolConnectionTry2(req, res, next) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            console.log("Failed! Connection with Database spicnspan via connection pool failed");

        }
        else {
            console.log("Success! Connection with Database spicnspan via connection pool succeeded");
        }
    });
}
function DBPoolConnectionTry(req, res, next) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            console.log("Failed! Connection with Database spicnspan via connection pool failed");
            DBPoolConnectionTry2();
        }
        else {
            console.log("Success! Connection with Database spicnspan via connection pool succeeded");
        }
    });
}
DBPoolConnectionTry();


app.options('/authenticate_SuType', supportCrossOriginScript);

app.post('/authenticate_SuType', supportCrossOriginScript, function (req, res) {


    var userid = req.body.uname;
    var password = req.body.pwd;

    DBPoolConnectionTry();
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("Failed! Connection with Database spicnspan via connection pool failed");
        }
        else {
            console.log("Success! Connection with Database spicnspan via connection pool succeeded");
            connection.query('set @userid=?; set @password=?; call usp_userLogin(@userid,@password)', [userid, password], function (err, rows) {
                if (err) {
                    console.log("Problem with MySQL" + err);
                }
                else {
                    res.end(JSON.stringify(rows[2]));
                }
            });
        }
        connection.release();
    });
});



//handle generic exceptions
//catch all other resource routes that are not defined above
app.get(securedpath + '/*', function (req, res) {
    res.json({ "code": 403, "status": "Requested resource not available" });
});

app.use(errorHandler);

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.json({ "code": 100, "status": "Error in establishing database connection" });
}
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(0);
    res.json({ err });
}
module.exports = app;
