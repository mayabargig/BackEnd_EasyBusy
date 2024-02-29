const { Payment } = require("../models/payment.model");

const getPayment = async (req, res) => {
    try {
        const query = req.query;
        console.log({query});
        const payments = await Payment.find({...query});
        res.send(payments);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const getSinglePayment = async (req, res) => {
    const { id } = req.params;
    try {
        console.log({id});
        const payment = await Payment.findById(id)
        .populate("userId")
        .populate("product")
        res.send(payment);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const createPayment = async (req, res) => {
    const body = req.body;

    try {
        body.userId = req.user.id;
        const newPayment = new Payment(body);
        newPayment.id= newPayment._id;
        await newPayment.save();
        res.send({ message: "Payment Send Successfully", data: body });
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    };
};

const updatePayment = async(req, res)=>{
    const body = req.body;
    const { id } = req.params;

    try {
        const payment =  await Payment.findByIdAndUpdate(id, body, {new:true});
        res.send(payment);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const deletePayment =async(req, res)=>{
    const { id } = req.params;

    try {
        const isDeleted = await Payment.findByIdAndDelete(id);
        if(isDeleted){
            return res.send({message:"Deleted Successfully"})
        }
        return res.status(404).send("Not Found");
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

module.exports = { getPayment, getSinglePayment, createPayment, updatePayment, deletePayment };