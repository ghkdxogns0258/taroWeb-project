// TarotController.js
const TarotService = require('../services/TarotService');
const mongoose = require('mongoose'); // Mongoose 모듈을 추가

exports.createTarotReading = async (req, res) => {
    try {
        if (!req.body.userId) {
            return res.status(400).send({ error: "userId is required" });
        }
        if (!mongoose.Types.ObjectId.isValid(req.body.userId)) {
            return res.status(400).send({ error: "Invalid userId format" });
        }
        const reading = await TarotService.performReading(req.body.userId);
        res.send({ reading });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};