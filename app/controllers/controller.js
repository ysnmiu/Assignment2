const mongoose = require('../../config/mongoose');
var Userdb = require("../models/list.server.model")

// create and save new user
exports.create = (req,res)=>{
    // new user
    const user = new Userdb({
        name : req.body.name,
        number : req.body.number,
        email : req.body.email,
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/business');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res,next)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}


// Update a new idetified user by user id
exports.update = function (req, res, next) {
    let id = req.query.id;

    const contactUpdated= new Userdb({
        _id:id,
        name : req.body.name,
        number : req.body.number,
        email : req.body.email,
    });
    console.log(req.body.name);
    Userdb.updateOne({_id:id}, contactUpdated,(err) =>{
        if (err) {
            console.log(err);
            return next(err);
        } else {
            
            res.redirect('/business');
        }
    });
}


// Delete a user with specified user id in the request
exports.delete = (req, res,next)=>{
    const id = req.params.id;

    Userdb.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
          
            res.redirect('/business');
        }
    });
}

     
  