const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 3000; // 포트 설정을 환경 변수에서 가져오거나 기본값 사용

// MongoDB에 연결
mongoose.connect('mongodb://localhost:27017/taroDB')
.then(() => {
    console.log("Database connected");
    app.listen(port, () => {  // 데이터베이스 연결 성공 후 서버 시작
        console.log(`Server running on port ${port}`);
    });
})
.catch(err => {
    console.error("Database connection error", err);
});