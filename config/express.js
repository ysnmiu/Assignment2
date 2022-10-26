// Created: Yip Michelle Sze Nga 
// Student Number: 301226102
// Subject: COMP229 - Web Application Development
// Date: 10/08/2022
// Institution: Centennial College


var config = require('./env/development')
var session = require('express-session')
var express = require('express')
var mongoose = require('mongoose')
var morgan = require('morgan')
var compress = require('compression')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')

module.exports = function() {
    var app = express()

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'))
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress())
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.use(bodyParser.json())
    app.use(methodOverride())

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }))

    // view engine setup
    app.set('views', './app/views')
    app.set('view engine', 'ejs')

    app.use(express.static('./public'))

    require('../app/routes/index.server.routes.js')(app)
    
    return app}