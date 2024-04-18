const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: String,
    type: String,
    image: String,
    meanings: {
        upright: String,
        reversed: String
    }
});

module.exports = mongoose.model('Card', cardSchema);