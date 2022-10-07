//Created: Yip Michelle Sze Nga
// Student Number: 301226102
//Subject: COMP229 - Web Application Development
//Date: 10/08/2022
//Institution: Centennial College

exports.renderHome = function(req, res) {
        res.render('index', {
        title: 'Home',
    })
}

exports.renderAbout = function(req, res) {
    res.render('about', {
    title: 'About',
})
}

exports.renderContact = function(req, res) {
    res.render('contact', {
    title: 'Contact',
})
}

exports.renderProjects = function(req, res) {
    res.render('projects', {
    title: 'Projects',
})
}

exports.renderService = function(req, res) {
    res.render('service', {
    title: 'Sevice',
})
}


