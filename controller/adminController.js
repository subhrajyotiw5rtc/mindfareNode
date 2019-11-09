var mongoose = require('mongoose');
var mden = require('md5');
var User =  require('../model/model.user');
var Product =  require('../model/model.product');


module.exports.login = (req, res, next) =>{
	const uname = req.body.uname;
	const password = req.body.password;
	const pass = mden(password);
	User.find({login_name : uname, password: pass},function(err,docs){
		console.log(docs);
		if (err) {
			console.log('err',err);
		}else{
			if (docs && docs.length > 0) {
				var respon={'status':1,"docs":docs,'msg':"Success"};
				res.send(respon);
			}else{
				var respon={'status':0,"msg":"Invalid credentials."};
				res.send(respon);
			}
		}
	})
}

//user signup

module.exports.signup = (req, res, next) =>{
	const uname = req.body.uname;
	const password = req.body.password;
	const email = req.body.email;
	const pass = mden(password);
	const status = 1;
	var use=new User({
		name:uname,
		login_name:uname,
		password:pass,
		email:email,
		status:status,
		user_type:status
	})
	//console.log('use',use);
	User.find({login_name : uname, email: email},function(err,docs){
		//console.log(docs);
		if (err) {
			console.log('err',err);
		}else{
			if (docs && docs.length > 0) {
				var respon={'status':0,"docs":docs,'msg':"The user name or email has already exist."};
				res.send(respon);
			}else{
				use.save((err1,data) =>{
					if (!err1) {
						if (data) {
							var respon={'status':1,"msg":"User added Successfully.."};
							res.send(respon);
						}
					}else{
						console.log('err1',err1);
					}
				})
			}
		}
	})
}

//save product

module.exports.saveProduct = (req, res, next) =>{
	const name = req.body.name;
	const price = req.body.price;
	const rating = req.body.rating;
	var pro=new Product({
		name:name,
		price:price,
		rating:rating
	})

	Product.find({ name : name}, function(err,docs){
		if (!err) {
			if (docs.length > 0) {
				var respon={'status':0,"docs":docs,'msg':"The product has already exist."};
				res.send(respon);
			}else{
				pro.save((err1,data) => {
					if (!err1) {
						if (data) {
							var respon={'status':1,"msg":"The product added Successfully.."};
							res.send(respon);
						}
					}else{
						console.log('err1',err1);
					}
				})
			}
		}
	})

}

//update product

module.exports.updateProduct = (req, res, next) =>{
	const name = req.body.name;
	const price = req.body.price;
	const rating = req.body.rating;
	const id = req.body.id;
	var pro=new Product({
		name:name,
		price:price,
		rating:rating
	})

	Product.find({ name : name, _id:{$ne: id}}, function(err,docs){
		if (!err) {
			if (docs.length > 0) {
				var respon={'status':0,"docs":docs,'msg':"The product has already exist."};
				res.send(respon);
			}else{
				Product.update({ _id : id}, { $set : { name:name,price:price,rating:rating}}, {multi:true},function(err1,data){
					if (!err1) {
						if (data) {
							var respon={'status':1,"msg":"The product updated Successfully.."};
							res.send(respon);
						}
					}else{
						console.log('err1',err1);
					}
				})
			}
		}
	})

}

//Get product

module.exports.getProduct = (req, res, next) =>{
	Product.find({}).sort({'_id': -1}).exec(function(err,docs){
		if (!err) {
			if (docs.length > 0) {
				var respon={'status':1,"docs":docs,'msg':"Success"};
				res.send(respon);
			}else{
				var respon={'status':1,"docs":[],'msg':"Success"};
				res.send(respon);
			}
		}
	})
}

//edit product

module.exports.editProduct = (req, res, next) =>{
    const id=req.body.id;
	Product.find({_id: id}, function(err,docs){
		console.log('product by id',docs);
		if (!err) {
			if (docs.length > 0) {
				var respon={'status':1,"docs":docs,'msg':"Success"};
				res.send(respon);
			}else{
				var respon={'status':0,"docs":[],'msg':"Failed"};
				res.send(respon);
			}
		}
	})
}

//delete Product

module.exports.deleteProduct = (req, res, next) =>{
    const id=req.body.id;
	Product.remove({_id: id}, function(err,docs){
		if (!err) {
			if (docs) {
				var respon={'status':1,"docs":docs,'msg':"Product deleted Successfully."};
				res.send(respon);
			}else{
				var respon={'status':0,"docs":[],'msg':"Failed"};
				res.send(respon);
			}
		}
	})
}