const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id:{
        type: String,
        required: false
    },
    firstName:{
        type: String,
        required: true
        },
    lastName:{
            type: String,
            required: true
            },
    // fullName:{
    //     type: String,
    //     required: true
    //     },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{ 
        type: String,
         required: true
        },
    telephone:{ 
        type: String,
        required: true
       },
    job:{ 
        type: String,
        required: true
     },
    address: {
        country: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        street: {
            type: String,
            required: false
        },
        apartment : {
            type: String,
            required: false
        }
    },
    role:{
            type: String,
            enum: ['regular', 'admin'],
            default: 'regular'
        },
    gender:{
            type: String,
            enum: ['male', 'female', 'other']
    },
    product:{
            type: mongoose.Types.ObjectId,
            ref: "Product"
            },
    profileImg:{
        type:String
    },
});

const User = mongoose.model("User", userSchema);
module.exports = { User };