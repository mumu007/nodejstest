var mongodb = require('./db');

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userScheMa = new Schema({
    userid: String,
    password: String
});	//	定义了一个新的模型，但是此模式还未和users集合有关联
var userModel = mongoose.model('users', userScheMa); //	与users集合关联

function User(user) {
  this.userid = user.userid;
  this.password = user.password;
};

module.exports = User;

//读取用户信息
User.get = function(userid, password, callback) {
  userModel.findOne({userid:userid,password:password},function(err,user){
  	callback(err,user);
  });
};