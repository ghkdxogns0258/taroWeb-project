const express = require('express');
const helmet = require('helmet');  // helmet 모듈을 불러옵니다.
const cors = require('cors');      // cors 모듈을 불러옵니다.

const app = express();  // express 앱 인스턴스를 생성합니다.

app.use(helmet());  // 보안 헤더 설정
app.use(cors());    // CORS 정책 설정
app.use(express.json());  // JSON 요청 본문 처리

const readingRoutes = require('./routes/readingRoutes'); // 리딩 라우트 모듈
app.use('/reading', readingRoutes); // 리딩 관련 라우트를 설정

module.exports = app;  // 이 app 모듈을 다른 파일에서 사용할 수 있도록 내보냅니다.