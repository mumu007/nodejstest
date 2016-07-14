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

User.list = function(callback) {
  userModel.find({},function(err,users){
  	callback(err,users);
  });
};

User.add = function(userid,password,callback){
	var user = {userid:userid,password:password};
    userModel.create(user,callback);
};

User.update = function(id,password,callback){
	console.log(password);
	userModel.findById(id,function(err,user){
      user.password = password;
      console.log(user._id);
      console.log(user.password);
      var _id = user._id; //需要取出主键_id
      delete user._id;    //再将其删除
      userModel.update({_id:_id},user,callback);
    });
};