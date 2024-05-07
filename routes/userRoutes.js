// userRoutes.js
const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

// 사용자 정보를 저장하는 POST 라우트
router.post('/users', UserController.createUser);

module.exports = router;
