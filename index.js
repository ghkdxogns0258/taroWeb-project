const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 3000;

// MongoDB에 연결
mongoose.connect('mongodb://localhost:27017/taroDB')
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error("Database connection error", err);
  });