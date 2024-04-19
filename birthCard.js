// birthCard.js
// 사용자의 생년월일을 기반으로 타로 카드를 계산하고 그 의미를 반환합니다.

const { performReading } = require('./TarotService');
const Card = require('./model/Card');

exports.getBirthCard = async (user) => {
    const numbers = user.birthdate.split('').map(Number);
    const sum = numbers.reduce((a, b) => a + b, 0) % 22;
    const card = await Card.findOne({ number: sum });

    // TarotService를 사용하여 카드의 의미를 설명합니다.
    return performReading(card.name);
};