// Mongoose 라이브러리 불러오기
const mongoose = require('mongoose');

// MongoDB에 연결
mongoose.connect('mongodb://localhost:27017/taroDB')
.then(() => {
    console.log("Database connected"); // 연결 성공 시 메시지 출력
}).catch(err => {
    console.error("Database connection error", err); // 연결 실패 시 에러 출력
});

// 사용자 스키마 정의
const userSchema = new mongoose.Schema({
    name: String,          // 이름
    birthdate: Date,       // 생년월일
    gender: String,        // 성별
    mbti: String           // MBTI 유형
});

// 카드 스키마 정의
const cardSchema = new mongoose.Schema({
    name: String,          // 카드 이름
    type: String,          // 카드 유형 ("Major" 또는 "Minor")
    image: String,         // 카드 이미지 URL
    meanings: {            // 카드의 의미
        upright: String,   // 정위치 의미
        reversed: String   // 역위치 의미
    }
});

// Mongoose 모델 생성
const User = mongoose.model('User', userSchema);
const Card = mongoose.model('Card', cardSchema);