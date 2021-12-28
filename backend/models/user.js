'use strict'
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({
    email: {
      type: String,
	  unique: true,
	  required: true,
	  trim: true
    },
    password: {
	  type: String,
	  required: true
    }
});

userSchema.statics.authenticate = function(email, password, callback){
	User.findOne({email: email})
	.exec(function (error, user) {
		if (error) {
			return callback(error);
		} else if(!user) {
			var err = new Error('User is not found');
			err.status = 401;
			return callback(err);
		}
		bcrypt.compare(password, user.password, function(error, result){
			if (result === true) {
				return callback(null, user);
			}else {
				return callback();
			}
		});
	});
}

userSchema.pre('save', function (next) {
let user = this;
bcrypt.hash(user.password, 10, function (err, hash) {
	if (err) {
		return next(err);
	}
	user.password = hash;
	next();
});
});

let User = mongoose.model('User', userSchema);
module.exports = User;
