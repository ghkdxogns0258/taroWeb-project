const { performReading } = require('./controllers/TarotController'); 
const Card = require('./model/Card'); 


exports.getThreeCards = async (reverse = false) => { // 역방향 여부를 매개변수로 추가합니다.
    const cards = await Card.aggregate([
        { $match: { type: 'major' } },  // 메이저 타입의 카드만 필터링
        { $sample: { size: 3 } }
    ]);

    // 역방향 선택 여부를 performReading 함수에 전달합니다.
    return Promise.all(cards.map(card => performReading(card.name, reverse))); 
};
