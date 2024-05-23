const express = require('express');
const mongoose = require('mongoose');
const app = require('./app');
const path = require('path');

const port = process.env.PORT || 3000;
const mongoDB = process.env.MONGO_URI || 'mongodb://localhost:27017/taroDB';

// MongoDB에 연결
mongoose.connect(mongoDB)
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error("Database connection error", err);
  });

// 정적 파일 제공 설정
app.use(express.static(path.join(__dirname, 'view')));
