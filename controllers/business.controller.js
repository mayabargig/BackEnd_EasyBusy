const { Business} = require("../models/business.model");

const getBusiness = async (req, res) => {
    try {
        const query = req.query;
        console.log({query});
        const business = await Business.find({...query});
        res.send(business);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const getSingleBusiness = async (req, res) => {
    const { id } = req.params;
    try {
        console.log({id});
        const business = await Business.findById(id).populate("userId");
        res.send(business);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const createBusiness = async (req, res) => {
    const body = req.body;

    try {
        console.log(req.user);
        body.userId = req.user.id;
        const newBusiness = new Business(body);
        newBusiness.id= newBusiness._id;
        await newBusiness.save();
        res.send({ message: "Business Send Successfully", data: body });
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    };
};

const updateBusiness = async(req, res)=>{
    const body = req.body;
    const { id } = req.params;

    try {
        const business =  await Business.findByIdAndUpdate(id, body, {new:true});
        res.send(business);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const deleteBusiness =async(req, res)=>{
    const { id } = req.params;

    try {
        const isDeleted = await Business.findByIdAndDelete(id);
        if(isDeleted){
            return res.send({message:"Deleted Successfully"})
        }
        return res.status(404).send("Not Found");
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

module.exports = { getBusiness, getSingleBusiness, createBusiness, updateBusiness, deleteBusiness };