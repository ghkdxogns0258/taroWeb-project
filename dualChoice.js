const axios = require('axios');
const Card = require('./model/Card');

// 양자택일 타로점을 처리하고 각 카드의 의미를 반환하는 함수
async function getDualChoice(user) {
    // 무작위로 5장의 카드를 뽑음
    const cards = await Card.aggregate([{ $sample: { size: 5 } }]);

    // 각 카드에 대해 ChatGPT API를 호출하여 의미를 설명
    const interpretations = await Promise.all(cards.map(async (card, index) => {
        const prompt = `For option ${index % 2 === 0 ? 'A' : 'B'}, what does the tarot card ${card.name} suggest?`;
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

module.exports = getDualChoice;