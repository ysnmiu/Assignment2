process.env.NODE_ENV = process.env.NODE_ENV || 'development'

var mongoose = require('mongoose')
var express = require('./config/express')
var passport = require('passport')
const localStrategy	= require('passport-local').Strategy;
const bcrypt = require('bcrypt');
var app = express()
var flash = require('connect-flash');


var HOST = 'localhost'
var PORT = process.env.PORT || 3000

app.listen(PORT); 

console.log(`Server running at http://${HOST}:${PORT}/`); 
module.exports = app; 

app.set('partials','./partials/footer')

app.use(passport.initialize());
app.use(passport.session());

var configMongoose = require('./config/mongoose');
const db = configMongoose();

//create dummy user//////////////////////////////////
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
})

const User = mongoose.model('users', UserSchema);

app.get('/setup', async (req, res) => {
	
	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);
		bcrypt.hash("qqq", salt, function (err, hash) {
			if (err) return next(err);
			
			const newAdmin = new User({
				username: "admin",
				password: hash
			});

			newAdmin.save();

			res.redirect('/login');
		});
	});
});

//////////////////////////////////////////////////////////////////////
passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

passport.use(new localStrategy(function (username, password, done) {
	User.findOne({ username: username }, function (err, user) {
		if (err) return done(err);
		if (!user) return done(null, false, { message: 'Incorrect username.' }, console.log('Incorrect username'));

		bcrypt.compare(password, user.password, function (err, res) {
			if (err) return done(err);
			if (res === false) return done(null, false, { message: 'Incorrect password.' }, console.log('Incorrect password'));
			
			return done(null, user, console.log("Login to business page"));
		});
	});
}));

app.post('/login', passport.authenticate('local', {
	successRedirect: '/business',
	failureRedirect: '/login?error=true'
}));

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) 
	console.log("Authenticated");
		return next();
	res.redirect('/login');
}
var index = require('./app/controllers/index.server.controller');
