let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    login: String,
    password: String,
    name: String
});

let User = mongoose.model('User', userSchema);

module.exports = User;
