var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
	console.log("xxxx");
  res.render('login', { title: 'login' });
});

router.get('/list', function(req, res, next) {
	console.log("list");
  User.list(function(err,users){
  	console.log("user list result");
  	res.send(users);
  });
});

router.post('/update', function(req, res, next) {
	if (req.body.oper === 'edit') {
		User.update(req.body.id,req.body.password,function(err,result){
		  	res.send("success");
  		});
	} else if(req.body.oper === 'add'){
		User.add(req.body.userid,req.body.password,function(err,result){
		  	console.log("add user" + result);
		  	res.send("success");
  		});
	}
  
});

module.exports = router;
