const { Appointment } = require("../models/appointments.model");
const nodemailer = require('nodemailer');

const getAppointment = async (req, res) => {
    try {
        const query = req.query;
        console.log({query});
        const appointment = await Appointment.find({...query});
        res.send(appointment);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const getSingleAppointment= async (req, res) => {
    const { date } = req.params;
    console.log({date});
    try {
        const appointment = await Appointment.find({date: date})
        .populate("userId")
        res.send(appointment);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const createAppointment = async (req, res) => {
    const body = req.body;
    console.log(body);

    try {
        body.userId = req.user.id;
        const newAppointment = new Appointment(body);
        newAppointment.id= newAppointment._id;
        await newAppointment.save();
        res.send({ message: "Appointment Send Successfully", data: body });
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    };
};

const updateAppointment = async(req, res)=>{
    const { id } = req.params;
    const updates  = req.body;
    console.log(updates);

    try {
        const appointment =  await Appointment.findByIdAndUpdate(id, updates , {new:true});
        if (!appointment) {
            return res.status(404).send({ message: 'Appointment not found' });
        }
        res.send(appointment);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const deleteAppointment =async(req, res)=>{
    const { id } = req.params;

    try {
        const isDeleted = await Appointment.findByIdAndDelete(id);
        if(isDeleted){
            return res.send({message:"Deleted Successfully"})
        }
        return res.status(404).send("Not Found");
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const sendEmail = async (req, res) => {
    const { to, subject, message } = req.body;

    // Create a transporter using nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: 'mayabargig@gmail.com',
            pass: 'mdhm aayg qewp uijv'
        },
        tls: {
            rejectUnauthorized: false,
          }
    });

    try {
        const info = await transporter.sendMail({
            from: "Maya Bargig <mayabargig@gmail.com>",
            to: to,
            subject: subject,
            html: message
        });
        console.log("Message sent: %s", info.messageId);
        res.send('Email sent successfully');
        console.log(info.accepted);
        console.log(info.rejected);
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send('Failed to send email');
    }
};

module.exports = { getAppointment, getSingleAppointment, createAppointment, updateAppointment, deleteAppointment, sendEmail };