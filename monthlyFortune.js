// monthlyFortune.js
// 한 달 동안의 운세를 예측하기 위해 무작위로 선택된 네 개의 카드의 의미를 반환합니다.

const { performReading } = require('./TarotService');
const Card = require('./model/Card');

exports.getMonthlyFortune = async () => {
    const cards = await Card.aggregate([{ $sample: { size: 4 } }]);  // 네 개의 카드를 무작위로 선택

    return Promise.all(cards.map(card => performReading(card.name)));
};