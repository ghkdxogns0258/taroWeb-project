// threeCards.js
// 과거, 현재, 미래에 대한 카드를 뽑고 각 카드의 의미를 반환합니다.

const { performReading } = require('./TarotService');
const Card = require('./model/Card');

exports.getThreeCards = async () => {
    const cards = await Card.aggregate([{ $sample: { size: 3 } }]);  // 세 개의 카드를 무작위로 선택

    return Promise.all(cards.map(card => performReading(card.name)));
};