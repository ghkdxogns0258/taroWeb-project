const express = require('express');
const router = express.Router();
const User = require('../model/User');
const getBirthCard = require('../birthCard');
const getMonthlyFortune = require('../monthlyFortune');
const getThreeCards = require('../threeCards');
const getDualChoice = require('../dualChoice');

// 사용자 정보 입력 및 리딩 유형 선택을 처리하는 POST 요청 핸들러
router.post('/', async (req, res) => {
    const { name, birthdate, gender, mbti, readingType } = req.body;
    const user = new User({ name, birthdate, gender, mbti, readingType });
    await user.save();

    try {
        let result;
        switch (readingType) {
            case "birthCard":
                result = await getBirthCard(user);
                break;
            case "monthlyFortune":
                result = await getMonthlyFortune(user);
                break;
            case "threeCards":
                result = await getThreeCards(user);
                break;
            case "dualChoice":
                result = await getDualChoice(user);
                break;
            default:
                return res.status(400).send({ message: "Invalid reading type" });
        }
        res.send({ result });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;