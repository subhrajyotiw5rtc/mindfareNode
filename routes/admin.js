var express = require('express');
var router = express.Router();
var adminController = require('../controller/adminController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
   res.sendFile(__dirname + '/admin/index.html');
});
router.post('/login',adminController.login);
router.post('/signup',adminController.signup);
router.post('/saveProduct',adminController.saveProduct);
router.get('/getProduct',adminController.getProduct);
router.post('/editProduct',adminController.editProduct);
router.post('/deleteProduct',adminController.deleteProduct);
router.post('/updateProduct',adminController.updateProduct);

module.exports = router;