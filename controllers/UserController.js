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
        const { userId, tarotSelection, selected_cards, reverse, majorMinor } = req.body;

        if (!userId || !tarotSelection || !selected_cards || reverse == null || !majorMinor) {
            return res.status(400).send({
                message: "Failed to update user tarot info",
                error: "All fields are required"
            });
        }

        console.log('Received selected_cards:', selected_cards);  // 디버깅을 위해 출력

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({
                message: "User not found",
                error: "Invalid user ID"
            });
        }

        // selected_cards가 JSON 문자열인지 확인하고, 그렇다면 파싱
        let parsedSelectedCards;
        try {
            parsedSelectedCards = JSON.parse(selected_cards);
            if (!Array.isArray(parsedSelectedCards)) {
                throw new Error('Invalid format: selected_cards is not an array');
            }
        } catch (error) {
            console.error('Error parsing selected_cards:', error);
            return res.status(400).send({
                message: "Failed to update user tarot info",
                error: "Invalid selected_cards format"
            });
        }

        user.tarotSelection = tarotSelection;
        user.selected_cards = parsedSelectedCards;  // 파싱된 배열 할당
        user.reverse = reverse === 'true'; // 문자열로 전송된 reverse 값을 boolean으로 변환
        user.majorMinor = majorMinor;

        await user.save();
        res.status(200).send({ message: "User tarot info updated successfully", user });
    } catch (error) {
        console.error('Error updating user tarot info:', error);
        res.status(500).send({ message: "Failed to update user tarot info", error: error.message });
    }
};
// 사용자 정보를 삭제하는 함수
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({ message: "User data deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Failed to delete user data", error: error.message });
    }
};