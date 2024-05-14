// UserController.js
const User = require('../model/User');

// 사용자 정보를 생성하는 컨트롤러 함수
exports.createUser = async (req, res) => {
    try {
        const { birthdate, gender, name, mbti } = req.body;

        if (!birthdate || !gender || !name || !mbti) {
            return res.status(400).send({ 
                message: "Failed to create user", 
                error: "All fields are required" 
            });
        }

        const newUser = new User({
            birthdate,
            gender,
            name,
            mbti
        });

        await newUser.save();
        res.status(201).send({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).send({ message: "Failed to create user", error: error });
    }
};