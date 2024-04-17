const axios = require('axios');
const Card = require('./model/Card');  

// 사용자 생년월일을 사용하여 탄생 카드를 계산하고 그 의미를 반환하는 함수
async function getBirthCard(user) {
    // 사용자 생년월일을 숫자로 변환하고 모든 숫자를 더한 후 22로 나눈 나머지를 계산
    const numbers = user.birthdate.split('').map(Number);
    const sum = numbers.reduce((a, b) => a + b, 0) % 22;
    // 계산된 번호를 기반으로 카드를 찾음
    const card = await Card.findOne({ number: sum });

    // ChatGPT API를 사용하여 타로 카드의 의미를 설명
    const prompt = `Explain the meaning of the tarot card ${card.name} for a user born on ${user.birthdate}`;
    const response = await axios.post('https://api.openai.com/v1/engines/chatgpt/completions', {
        prompt: prompt,
        max_tokens: 150
    }, {
        headers: { 'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}` }
    });

    return response.data.choices[0].text;
}

module.exports = getBirthCard;