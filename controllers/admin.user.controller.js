const { Admin } = require("../models/admin.user.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

const getAdministrators = async(req, res)=>{
    try{
        const Administrators = await Admin.find({});
        res.send(Administrators);
    }catch(error){
        console.log(error);
        res.status(400).send("Error");
    }
};

const loginAdmin = async(req, res)=>{
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if(admin){
            const isMatch = await bcrypt.compare(password, admin.password);
            if(isMatch){
                const token = generateToken({id: admin._id, email: admin.email, role: "admin"});
                return res.send({ admin, token });
            };
            return res.status(401).send("Email or Password are incorrect");
        } 
        return res.status(401).send("Email or Password are incorrect");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
};

const registerAdmin = async(req, res)=>{
    try {
        const {email, password, firstName,lastName} = req.body;
        const hash= await bcrypt.hash(password, 10);
        console.log({hash});
        const newAdmin = new Admin({email, password: hash, firstName,lastName});
        newAdmin.id = newAdmin._id;
        await newAdmin.save();
        res.status(201).send({message:"Admin Register Successfully", data:newAdmin})
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const updatedAdmin= async(req, res)=>{
    const body = req.body;
    const { id } = req.params;

    try {
        const admin =  await Admin.findByIdAndUpdate(id, body, {new:true});
        res.send(admin);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const deleteAdmin = async(req, res)=>{
    const { id } = req.params;

    try {
        const isDeleted = await Admin.findByIdAndDelete(id);
        if(isDeleted){
            return res.send({message:"Deleted Successfully"})
        }
        res.send("Not Found")
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

module.exports = { getAdministrators, loginAdmin, registerAdmin, updatedAdmin, deleteAdmin};