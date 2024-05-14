const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const readingRoutes = require('./routes/readingRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(helmet());  // 보안 헤더 설정
app.use(cors());    // CORS 정책을 설정하여 다양한 출처에서의 접근을 허용
app.use(express.json());  // JSON 형식의 요청 본문을 파싱

// 정적 파일 라우트 설정
app.use(express.static(path.join(__dirname, 'view')));

app.get('/',(req,res)=>{
    res.sendfile(__dirname+'/view/start.html')
})
// API 라우트 설정
app.use('/reading', readingRoutes); // '/reading' 경로에 대한 라우트를 설정
app.use('/api', userRoutes);  // '/api' 경로에 대한 라우트를 설정

module.exports = app;  // app 모듈을 내보냄, 다른 파일에서 사용 가능