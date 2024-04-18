const axios = require('axios'); // axios 라이브러리를 불러옵니다.

// ChatGPT API를 호출하여 타로 카드 읽기 결과를 가져오는 함수
exports.getReading = async (prompt) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/chatgpt/completions', {
            prompt: prompt, // ChatGPT에 보낼 프롬프트
            max_tokens: 150 // 최대 토큰 수를 지정합니다.
        }, {
            headers: { 'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}` } // 환경 변수에서 API 키를 가져와 헤더에 추가합니다.
        });
        return response.data.choices[0].text; // API 응답에서 텍스트 결과를 추출하여 반환합니다.
    } catch (error) {
        console.error('Error calling ChatGPT API', error); // API 호출 중 에러가 발생하면 콘솔에 로그를 출력합니다.
        throw error; // 에러를 다시 발생시켜 호출자에게 전달합니다.
    }
};