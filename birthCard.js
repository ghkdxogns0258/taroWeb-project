const { performReading } = require('./controllers/TarotController'); 
const Card = require('./model/Card'); 

exports.getBirthCard = async (user, reverse = false) => { // 역방향 여부를 매개변수로 추가합니다.
    const numbers = user.birthdate.split('').map(Number);
    const sum = numbers.reduce((a, b) => a + b, 0) % 22;
    const card = await Card.findOne({ number: sum, type: 'major' });

    // 역방향 선택 여부를 performReading 함수에 전달합니다.
    return performReading(card.name, reverse); 
};
