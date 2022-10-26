//-- Created: Yip Michelle Sze Nga
// Student Number: 301226102
//Subject: COMP229 - Web Application Development
//Date: 10/08/2022
//Institution: Centennial College

const passport = require('passport');
const app = require('../../server');



/* GET all pages */ 
module.exports = function(app) {
    var passport = require('passport')
    var index = require('../controllers/index.server.controller');
    var controller = require('../controllers/controller')
    app.use(passport.initialize());
    app.use(passport.session());

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated()) {
            console.log("is Authenticated");
            
            return next();
        }else{
            
            res.redirect('/login');
        }
        
    }
    app.get('/', index.renderHome);
    app.get('/Home', index.renderHome);
    app.get('/About', index.renderAbout);
    app.get('/Projects', index.renderProjects);
    app.get('/Service', index.renderService);
    app.get('/Contact', index.renderContact);
    app.get('/Login', index.renderLogin);
    app.get('/Add', index.renderAddUser);
    app.get('/Update', index.renderUpdateUser);
    app.get('/Business',isLoggedIn, index.renderBusiness); 

    // Api
    app.post('/api/users',controller.create)
    app.get('/api/users', controller.find);
    app.post('/update', controller.update);
    //app.post('/update/:id', controller.update);
    app.get('/delete/:id', controller.delete);
};

