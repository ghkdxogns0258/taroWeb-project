const { performReading } = require('./services/TarotService'); 
const Card = require('./model/Card'); 


exports.getFourCards = async (reverse = false) => { // 역방향 여부를 매개변수로 추가합니다.
    const cards = await Card.aggregate([
        { $match: { type: { $in: ['major', 'minor'] } } }, // 메이저와 마이너 카드를 모두 포함하도록 조건을 추가합니다.
        { $sample: { size: 4 } }
    ]);

    // 역방향 선택 여부를 performReading 함수에 전달합니다.
    return Promise.all(cards.map(card => performReading(card.name, reverse))); 
};
