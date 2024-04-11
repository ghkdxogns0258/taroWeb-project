const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/taroDB',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("CONNECTION CLEAR")
})
.catch(err=>{
    console.log("ERROR")
    console.log(err)
})

const taroSchema=new mongoose.Schema({

})