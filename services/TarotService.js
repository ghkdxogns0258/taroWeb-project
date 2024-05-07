const User = require('../model/User'); // User 모델을 불러옵니다.
const TarotAPI = require('../integration/TarotAPI'); // TarotAPI 인티그레이션을 불러옵니다.

// 사용자 ID로 사용자를 찾고 타로 읽기를 수행하는 함수
exports.performReading = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    const prompt = createPrompt(user);
    return await TarotAPI.getReading(prompt);
};

function createPrompt(user) {
    // 사용자 정보를 바탕으로 ChatGPT 프롬프트 문자열을 생성합니다.
    return `Tarot reading for ${user.name}, born on ${user.birthdate}`;
}
