const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    id:{
        type: String,
        required: false
    },
    title:{
        type: String,
        required: true,
        unique:true
        },
    total:{
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    favorites: {
        type: mongoose.Types.ObjectId,
        ref: "Favorites"
    },
    isPay:{
        type: Boolean,
        required: true
    }
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = { Payment };