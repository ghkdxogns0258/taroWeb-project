const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,  
    name: String,
    type: String,
    number: Number,  
    image: String,
    meanings: {
        upright: String,
        reversed: String
    }
});

module.exports = mongoose.model('Card', cardSchema);
