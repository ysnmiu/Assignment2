//Created: Yip Michelle Sze Nga
// Student Number: 301226102
//Subject: COMP229 - Web Application Development
//Date: 10/08/2022
//Institution: Centennial College


exports.renderHome = function(req,res ) {
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

exports.renderLogin = function(req, res) {
res.render('login', {
title: 'Login',
})
}

exports.renderBusiness = function(req, res) {
    console.log("here");
    const axios = require('axios');
    
    // Make a get request to /api/users
   axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('business', {title:'Business', users : response.data });
            
        })
        .catch(err =>{
            console.log(err);
            
        })

    
}

exports.renderAddUser = function(req, res) {

    res.render('add', {
    title: 'Add',
    })
    }


 
exports.renderUpdateUser = function(req, res) {
    const axios = require('axios');
    axios.get('http://localhost:3000/api/users')
   .then(function(userdata){
       res.render("update", { title:'Update',user : userdata.data})
    })
   .catch(err =>{
       res.send(err);
   })
}
