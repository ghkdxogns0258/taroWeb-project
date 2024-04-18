const axios = require('axios');
const Card = require('./model/Card');

// 과거, 현재, 미래에 대한 타로점을 처리하는 함수
async function getThreeCards(user) {
    // 무작위로 3장의 카드를 뽑음
    const cards = await Card.aggregate([{ $sample: { size: 3 } }]);

    // 각 카드에 대해 과거, 현재, 미래 의미를 설명
    const interpretations = await Promise.all(cards.map(async (card) => {
        const prompt = `What does the tarot card ${card.name} signify for past, present, and future?`;
        const response = await axios.post('https://api.openai.com/v1/engines/chatgpt/completions', {
            prompt: prompt,
            max_tokens: 150
        }, {
            headers: { 'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}` }
        });
        return response.data.choices[0].text;
    }));

    return interpretations;
}

module.exports = getThreeCards;