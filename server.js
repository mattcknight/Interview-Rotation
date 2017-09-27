/* global base_dir */
/* global abs_path */

require('./env');
var config = require("./config");

global.base_dir = __dirname;
global.abs_path = function (path) {
    return base_dir + path;
};
global.include = function (file) {
    return require(abs_path('/' + file));
};

var express = require('express');
var mysql = require("mysql");
var bodyParser = require('body-parser');
var md5 = require('md5');
var rest = require("./REST");
var methodOverride = require('method-override');
var path = require('path');
var app = express();

//queryEpicStories(queryChildren);


//REST
function REST() {
    var self = this;
    self.connectMysql();
}


REST.prototype.connectMysql = function () {
    var self = this;
    var pool = mysql.createPool({
        connectionLimit: 100,
        host: config.mysql.server,
        user: config.mysql.username,
        password: config.mysql.password,
        database: config.mysql.database,
        debug: false
    });

    pool.getConnection(function (err, connection) {
        if (err) {
            self.stop(err);
        } else {
            self.configureExpress(connection);
        }
    });
};


REST.prototype.configureExpress = function (connection, next) {
    var self = this;
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use(express.static(__dirname + '/public'));
    var router = express.Router();
    app.use('/api', router);
    var rest_router = new rest(router, connection, md5, next);
    app.use(logErrors);
    app.use(clientErrorHandler);
    app.use(errorHandler);
    app.get('/', function (req, res) {
        res.sendFile(abs_path('/public/pages/index.html'));
    });
    self.startServer();
};

REST.prototype.startServer = function () {
    console.log("Starting App...");
    app.listen(config.web.port, function () {
        console.log("Process started on port: " + config.web.port);
    });
};

REST.prototype.stop = function (err) {
    console.log("!! Issue with MySQL: " + err);
    process.exit(1);
};

new REST();

function logErrors(err, req, res, next) {
    console.error(err);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({
            error: '!! ERROR !!: ' + 'Something failed!'
        });
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    var err_code;
    var err_message;
    if (err.message.split([': ']).length == 2) {
        err_code = err.message.split([': '])[0];
        err_message = err.message.split([': '])[1];
    } else {
        err_message = err.message;
    }
    res.status(500);
    res.send({
        data: null,
        code: err_code,
        message: err_message,
        status: 500,
        response: err
    });
}