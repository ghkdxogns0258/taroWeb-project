const axios = require('axios');  // axios 라이브러리를 불러옴

// ChatGPT API를 호출하여 타로 카드 읽기 결과를 가져오는 함수
exports.getReading = async (prompt) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a tarot reading assistant who provides responses in Korean.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 800  // 최대 토큰 수 설정
    }, {
      headers: { 'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}` }  // 환경 변수에서 API 키를 가져와 헤더에 추가
    });

    return response.data.choices[0].message.content;  // API 응답에서 텍스트 결과 반환
  } catch (error) {
    console.error('Error calling ChatGPT API', error);  // API 호출 중 오류 발생 시 콘솔에 로그 출력
    throw error;  // 오류를 다시 발생시켜 호출자에게 전달
  }
};