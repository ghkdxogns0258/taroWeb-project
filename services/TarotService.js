const User = require('../model/User'); // User 모델을 불러옵니다.
const TarotAPI = require('../integration/TarotAPI'); // TarotAPI 인티그레이션을 불러옵니다.
const Card = require('../model/Card'); // Card 모델을 불러옵니다.

// 사용자 ID로 사용자를 찾고 타로 읽기를 수행하는 함수
exports.performReading = async (userId, reverse = false) => { // 역방향 여부를 매개변수로 추가합니다.
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found'); // 사용자를 찾을 수 없으면 에러 발생
    const card = await Card.aggregate([
        { $sample: { size: 1 } },
        { $addFields: { reversed: reverse ? { $rand: { output: [true, false] } } : false } } // 역방향 확률 추가
    ]).toArray();
    const direction = card[0].reversed ? 'reversed' : 'upright'; // 카드 방향 결정
    const prompt = createPrompt(user, card[0].name, direction); // 프롬프트 생성
    return await TarotAPI.getReading(prompt); // TarotAPI를 통해 읽기 결과 가져오기
};

// 사용자 정보와 카드 정보를 바탕으로 ChatGPT 프롬프트 문자열을 생성합니다.
function createPrompt(user, cardName, direction) {
    return `Tarot reading for ${user.name}, born on ${user.birthdate}, card: ${cardName}, direction: ${direction}`;
}