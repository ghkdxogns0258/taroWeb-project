// userRoutes.js
const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

// 사용자 정보를 저장하는 POST 라우트
router.post('/users', UserController.createUser);

// 사용자 타로 정보를 업데이트하는 POST 라우트
router.post('/users/tarot', UserController.updateTarotInfo);

// 사용자 정보를 삭제하는 DELETE 라우트
router.delete('/users/:userId', UserController.deleteUser);

module.exports = router;