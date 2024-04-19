const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    birthdate: Date,
    gender: String,
    mbti: String,
    readingType: String,
});

module.exports = mongoose.model('User', userSchema);