// UserController.js
const User = require('../model/User');

// 사용자 정보를 생성하는 컨트롤러 함수
exports.createUser = async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            birthdate: req.body.birthdate,
            gender: req.body.gender,
            mbti: req.body.mbti,
            readingType: req.body.readingType
        });
        await newUser.save();
        res.status(201).send({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).send({ message: "Failed to create user", error: error });
    }
};