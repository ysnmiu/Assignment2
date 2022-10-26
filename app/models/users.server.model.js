const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')


mongoose.connect('mongodb://localhost/mean-book',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const User = new Schema({
    username: {String,
    required:true},
    password: {String,
       required:true}
})

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User, 'userData');



