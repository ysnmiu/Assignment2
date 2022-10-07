//-- Created: Yip Michelle Sze Nga
// Student Number: 301226102
//Subject: COMP229 - Web Application Development
//Date: 10/08/2022
//Institution: Centennial College

/* GET all pages */
module.exports = function(app) {
    var index = require('../controllers/index.server.controller');
    app.get('/', index.renderHome);
    app.get('/Home', index.renderHome);
    app.get('/About', index.renderAbout);
    app.get('/Projects', index.renderProjects);
    app.get('/Service', index.renderService);
    app.get('/Contact', index.renderContact);
};