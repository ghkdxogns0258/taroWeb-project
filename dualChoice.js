// dualChoice.js
// 두 가지 선택지에 대한 카드를 무작위로 선택하고 각 카드의 의미를 반환합니다.

const { performReading } = require('./TarotService');
const Card = require('./model/Card');

exports.getDualChoice = async () => {
    const cards = await Card.aggregate([{ $sample: { size: 2 } }]);  // 두 개의 카드를 무작위로 선택

    return Promise.all(cards.map(card => performReading(card.name)));
};