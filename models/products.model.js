const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id:{
        type: String,
        required: false
    },
    title:{
        type: String,
        required: true,
        // unique:true
        },
    description:{
            type: String,
            required: false
            },
    category:{
            type: String,
            required: false
            },
    price:{
        type: String,
        required: true
    }, 
    imgSrc:{
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
});

const Product = mongoose.model("Product", productSchema);
module.exports = { Product };