// TarotService.js
const User = require('../model/User');
const TarotAPI = require('../integration/TarotAPI');

// 타로 읽기를 수행하는 함수
exports.performReading = async (userId, selectedCard, reverse = false, majorMinor = "both") => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const direction = reverse ? 'reversed' : 'upright';
    const prompt = createPrompt(user, selectedCard, direction, majorMinor);

    return await TarotAPI.getReading(prompt);
  } catch (error) {
    console.error('Error in performReading:', error);
    throw error;
  }
};

// 사용자 정보와 카드 정보를 바탕으로 ChatGPT 프롬프트 문자열을 생성하는 함수
function createPrompt(user, cardName, direction, majorMinor) {
  return `
  Perform a tarot reading for the following user:

  - Name: ${user.name}
  - Birthdate: ${user.birthdate}
  - Gender: ${user.gender}
  - MBTI: ${user.mbti}
  - Fortune type: ${user.fortune}
  - Tarot selection: ${user.tarotSelection}
  - Card: ${cardName}
  - Direction: ${direction}
  - Major/Minor: ${majorMinor}

  Considering the user's MBTI type (${user.mbti}), provide a personalized tarot reading interpretation. 
  Explain how the card's meaning might be particularly relevant or interpreted for someone with this MBTI type.
  `;
}
