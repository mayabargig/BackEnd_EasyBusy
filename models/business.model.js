const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
    id:{
        type: String,
        required: false
    },
    title:{
        type: String,
        required: true,
        unique:true
        },
    logo:{
        type: String,
        required: false
    },
    openingHours:{
        type: String,
        required: false
    },
    address:{
        type: String,
        required: false
    },
    businessNumber:{
        type: String,
        required: false
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
});

const Business  = mongoose.model("Business", BusinessSchema);
module.exports = { Business };