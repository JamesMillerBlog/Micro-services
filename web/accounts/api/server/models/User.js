const mongoose = require('mongoose');
// assign the object within mongoose called .Schema to a const called Schema
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);