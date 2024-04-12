const express = require('express'); // express 모듈을 불러옴
const mongoose = require('mongoose'); // mongoose 모듈을 불러옴
const axios = require('axios'); // axios 모듈을 불러옴
const app = express(); // express 애플리케이션 인스턴스 생성
const port = 3000; // 서버가 사용할 포트 번호 설정

app.use(express.json()); // 요청 본문을 JSON 형태로 파싱하기 위한 미들웨어 사용

// MongoDB에 연결
mongoose.connect('mongodb://localhost:27017/taroDB')
.then(() => {
    console.log("Database connected"); // 연결 성공 시 메시지 출력
}).catch(err => {
    console.error("Database connection error", err); // 연결 실패 시 에러 출력
});
// 카드 스키마 정의
const cardSchema = new mongoose.Schema({
    name: String, // 카드 이름
    type: String, // 카드 유형 ("Major" 또는 "Minor")
    image: String, // 카드 이미지 URL
    meanings: { // 카드의 의미
        upright: String, // 정위치 의미
        reversed: String // 역위치 의미
    }
});

// 사용자 스키마 정의
const userSchema = new mongoose.Schema({
    name: String, // 사용자 이름
    birthdate: Date, // 사용자 생년월일
    gender: String, // 사용자 성별
    mbti: String, // 사용자 MBTI
    readingType: String, // 사용자가 선택한 리딩 유형
});

// 모델 생성
const User = mongoose.model('User', userSchema);
const Card = mongoose.model('Card', cardSchema);

// 사용자 정보 입력 및 리딩 유형 선택을 처리하는 POST 요청 핸들러
app.post('/reading', async (req, res) => {
    const { name, birthdate, gender, mbti, readingType } = req.body; // 요청 본문에서 데이터 추출
    const user = new User({ name, birthdate, gender, mbti, readingType }); // 새로운 User 인스턴스 생성
    await user.save(); // User 인스턴스를 데이터베이스에 저장

    // 선택된 리딩 유형에 따라 다른 처리 수행
    switch (readingType) {
        case "birthCard":
            // 탄생카드 고르기 로직
            break;
        case "monthlyFortune":
            // 한달운세 로직
            break;
        case "threeCards":
            // 쓰리카드 로직
            break;
        case "dualChoice":
            // 양자택일 로직
            break;
        default:
            return res.status(400).send({ message: "Invalid reading type" }); // 유효하지 않은 리딩 유형 처리
    }

    // ChatGPT API를 호출하여 카드 해석 결과 받기
    const interpretation = await getTarotReading(user, selectedCards);
    res.send({ interpretation }); // 해석 결과를 응답으로 보냄
});

// ChatGPT API를 호출하는 함수
async function getTarotReading(user, cards) {
    const response = await axios.post('https://api.openai.com/v1/engines/chatgpt/completions', {
        prompt: createPrompt(user, cards), // 생성된 프롬프트 사용
        max_tokens: 150
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}` // API 키를 환경 변수에서 가져옴
        }
    });
    return response.data.choices[0].text; // API 응답에서 텍스트 추출
}

// 해석 요청 프롬프트를 생성하는 함수
function createPrompt(user, cards) {
    return `User Information: ${JSON.stringify(user)}\nCards: ${JSON.stringify(cards)}\nInterpret the cards:`;
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`); // 서버 시작 시 로그 출력
});