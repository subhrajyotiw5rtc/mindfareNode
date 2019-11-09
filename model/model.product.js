var mongoose = require('mongoose');
var product = new mongoose.Schema({
	name : String,
	price : String,
	rating : String,
	date_added: { type: Date, default: Date.now }
})
var Product = mongoose.model('product', product);
module.exports = Product;