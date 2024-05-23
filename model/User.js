const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    birthdate: { type: String, required: true },
    gender: { type: String, required: true },
    name: { type: String, required: true },
    mbti: { type: String, required: true },
    fortune: { type: String, required: true },
    tarotSelection: { type: String, required: false },  // 타로 점 선택 (원카드, 쓰리카드 등)
    selected_cards: [{ 
        name: { type: String, required: true },
        reversed: { type: Boolean, required: true }
    }],
    reverse: { type: Boolean, required: false },        // 역방향 여부
    majorMinor: { type: String, required: false }       // major/minor 카드 선택 여부
});

module.exports = mongoose.model('User', userSchema);
