// TarotService.js
const User = require('../model/User');
const TarotAPI = require('../integration/TarotAPI');

// 타로 읽기를 수행하는 함수
exports.performReading = async (userId, selectedCards, reverse = false, majorMinor = "both") => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const direction = reverse ? 'reversed' : 'upright';
    const prompt = createPrompt(user, selectedCards, direction, majorMinor);

    return await TarotAPI.getReading(prompt);
  } catch (error) {
    console.error('Error in performReading:', error);
    throw error;
  }
};

// 사용자 정보와 카드 정보를 바탕으로 ChatGPT 프롬프트 문자열을 생성하는 함수
function createPrompt(user, cardName, direction, majorMinor) {
  return `
  Please create a text for tarot results.
  First, let's start with a greeting to the user. ex) Hello, this is the tarot interpretation of ${user.fortune} from ${user.name}.
  Then, for each card, provide a simple interpretation by considering ${user.fortune} and ${user.mbti} according to one of the tarot card spreads, ${user.tarotSelection}.
  Lastly, please provide a personal and comprehensive tarot result for ${user.fortune} considering the user's ${user.mbti}.
  The information needed to see tarot dots will be described below:

  - Name: ${user.name}
  - Birthdate: ${user.birthdate}
  - Gender: ${user.gender}
  - MBTI: ${user.mbti}
  - Fortune type: ${user.fortune}
  - Tarot selection: ${user.tarotSelection}
  - Selected cards: ${user.selected_cards}
  - Card: ${cardName}
  - Direction: ${direction}
  - Major/Minor: ${majorMinor}
  
  `;
}