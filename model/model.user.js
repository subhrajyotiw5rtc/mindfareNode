var mongoose = require('mongoose');
var user = new mongoose.Schema({
	name : String,
	login_name : String,
	password : String,
	email : String,
	status : Number,
	user_type : Number
})
var User = mongoose.model('customer', user);
module.exports = User;