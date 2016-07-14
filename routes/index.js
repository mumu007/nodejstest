var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var mongoose = require('mongoose');
//var user = require('../models/user').user;
var settings = require('../settings');
mongoose.connect('mongodb://'+settings.host + ':' + settings.port +'/'+ settings.db);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*router.post('/homepage', function(req, res) {
    var query_doc = {userid: req.body.userid, password: req.body.password};
    (function(){
        user.count(query_doc, function(err, doc){
            if(doc == 1){
                console.log(query_doc.userid + ": login success in " + new Date());
                res.render('homepage', { title: 'homepage' });
            }else{
                console.log(query_doc.userid + ": login failed in " + new Date());
                res.redirect('/');
            }
        });
    })(query_doc);
});*/

router.post('/homepage', function(req, res) {
    User.get(req.body.userid, req.body.password,function(err,user){
        if (user) {
            console.log(req.body.userid + ": login success in " + new Date());
                res.render('homepage', { title: 'homepage' });
        } else {
            console.log(req.body.userid + ": login failed in " + new Date());
                res.redirect('/');
        }
    });
});



module.exports = router;
