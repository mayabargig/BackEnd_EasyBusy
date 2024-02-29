const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{ type: String,
         required: true
        },
    BusinessNumber:{
            type: String,
            required: false
        },
    address:{
            type: String,
            required: false
     }
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = { Admin };