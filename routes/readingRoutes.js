const express = require('express');
const router = express.Router();
const TarotController = require('../controllers/TarotController');

router.post('/', TarotController.createTarotReading);  // POST 요청 처리를 위한 라우트 설정

module.exports = router;  // 라우터를 내보내어 다른 파일에서 사용할 수 있게 함