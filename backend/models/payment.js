const mongoose = require('mongoose');

const payment = new mongoose.Schema({
    userName :{
        type : String,
        required : true,
    },
    userMail :{
        type : String,
        required : true,
    },
    userContact:{
        type : Number,
        required : true,
    },
    amount:{
        type : Number,
        required : true,
    },
    userAddress:{
        type : String,
        required : true,
    }
})

module.exports = mongoose.model('payment',payment)