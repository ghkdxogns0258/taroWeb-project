// TarotController.js
// TarotController.js
const TarotService = require('../services/TarotService');
const mongoose = require('mongoose');

// 타로 읽기를 생성하는 함수
exports.createTarotReading = async (req, res) => {
  try {
    if (!req.body.userId) {
      return res.status(400).send({ error: "userId is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(req.body.userId)) {
      return res.status(400).send({ error: "Invalid userId format" });
    }
    const reverse = req.body.reverse || false;
    const majorMinor = req.body.majorMinor || "both";
    const card = req.body.tarotSelection;

    const reading = await TarotService.performReading(req.body.userId, card, reverse, majorMinor);
    res.send({ reading });
  } catch (error) {
    console.error('Error in createTarotReading:', error);
    res.status(500).send({ error: error.message });
  }
};