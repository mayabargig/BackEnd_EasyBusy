const mongoose = require("mongoose");

const appointmentsSchema = new mongoose.Schema({
    id:{
        type: String,
        required: false
    },
    title:{
        type: String,
        required: true
    },
    products:{
        type: mongoose.Types.ObjectId,
        ref: "Product"
        },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    userName: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: true,
    },
    timeSlot: {
        start: {
            type: String,
            required: true
        },
        end: {
            type: String,
            required: true
        }
    }
    // hour: {
    //     type: Number,
    //     min: 0,
    //     max: 23,
    //     required: true
    // },
    // minute: {
    //     type: Number,
    //     min: 0,
    //     max: 59,
    //     required: true
    // }
});

const Appointment  = mongoose.model("Appointment", appointmentsSchema);
module.exports = { Appointment };