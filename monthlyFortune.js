const axios = require('axios');
const Card = require('./model/Card');

// 한 달 동안의 운세를 반환하는 함수
async function getMonthlyFortune(user) {
    // 무작위로 4장의 카드를 뽑음
    const cards = await Card.aggregate([{ $sample: { size: 4 } }]);

    // 각 카드에 대해 ChatGPT를 사용하여 주간 의미를 설명
    const prompts = cards.map(card => `Explain the weekly meaning of the tarot card ${card.name}`);
    const interpretations = [];

    for (let prompt of prompts) {
        const response = await axios.post('https://api.openai.com/v1/engines/chatgpt/completions', {
            prompt: prompt,
            max_tokens: 150
        }, {
            headers: { 'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}` }
        });
        interpretations.push(response.data.choices[0].text);
    }

    return interpretations;
}

module.exports = getMonthlyFortune;