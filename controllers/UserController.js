// UserController.js
const User = require('../model/User');

// 사용자 정보를 생성하는 컨트롤러 함수
exports.createUser = async (req, res) => {
    try {
        const { birthdate, gender, name, mbti, fortune } = req.body;

        if (!birthdate || !gender || !name || !mbti || !fortune) {
            return res.status(400).send({
                message: "Failed to create user",
                error: "All fields are required"
            });
        }

        const newUser = new User({
            birthdate,
            gender,
            name,
            mbti,
            fortune
        });

        await newUser.save();
        res.status(201).send({ message: "User created successfully", userId: newUser._id });
    } catch (error) {
        res.status(500).send({ message: "Failed to create user", error: error });
    }
};

// 사용자 타로 정보를 업데이트하는 함수
exports.updateTarotInfo = async (req, res) => {
    try {
        const { userId, tarotSelection, reverse, majorMinor } = req.body;

        if (!userId || !tarotSelection || reverse == null || !majorMinor) {
            return res.status(400).send({
                message: "Failed to update user tarot info",
                error: "All fields are required"
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({
                message: "User not found",
                error: "Invalid user ID"
            });
        }

        user.tarotSelection = tarotSelection;
        user.reverse = reverse;
        user.majorMinor = majorMinor;

        await user.save();
        res.status(200).send({ message: "User tarot info updated successfully", user });
    } catch (error) {
        res.status(500).send({ message: "Failed to update user tarot info", error });
    }
};