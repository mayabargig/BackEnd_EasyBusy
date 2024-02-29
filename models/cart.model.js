const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    id:{
        type: String,
        required: false
    },
    product:{
        type: mongoose.Types.ObjectId,
        ref: "Product",
        unique:true
        },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
});

const Cart  = mongoose.model("cart", CartSchema);
module.exports = { Cart };