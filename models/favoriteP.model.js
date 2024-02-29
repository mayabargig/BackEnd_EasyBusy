const mongoose = require("mongoose");

const favoriteCardSchema = new mongoose.Schema({
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

const Favorites  = mongoose.model("Favorites", favoriteCardSchema);
module.exports = { Favorites };