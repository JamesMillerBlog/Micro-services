const mongoose = require('mongoose');
// assign the object within mongoose called .Schema to a const called Schema
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	googleName: String
});

mongoose.model('users', userSchema);