//User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    birthdate: { type: String, required: true },
    gender: { type: String, required: true },
    name: { type: String, required: true },
    mbti: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);