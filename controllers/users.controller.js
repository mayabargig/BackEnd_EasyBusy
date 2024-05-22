const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { generateToken, verifyToken } = require("../utils/jwt");
const jwt = require("jsonwebtoken");

const getUsers = async(req, res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch(error){
        console.log(error);
        res.status(400).send("Error");
    }
};

const login = async(req, res)=>{
    const { email, password } = req.body;
    console.log(req.body);

    try {
        const user = await User.findOne({ email });
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                const token = generateToken({id: user._id, email: user.email, role:user.role});
                return res.send({ user, token });
            };
            return res.status(401).send("Email or Password are incorrect");
        } 
        return res.status(401).send("Email or Password are incorrect");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
};

const register = async(req, res)=>{
    try {
        const {email, password, firstName, lastName, role, address, telephone, job, gender } = req.body;
        const hash= await bcrypt.hash(password, 10);
        console.log({hash});
        console.log(req.body.address);
        const user = new User({email, password: hash, firstName, lastName, role, address, telephone, job, gender});
        user.id = user._id;
        await user.save();
        const token = generateToken({user});
        res.status(201).send({user, token});
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const updatedUser = async(req, res)=>{
    const body = req.body;
    const { id } = req.params;
    console.log(body);
    console.log(id);

    try {
        const user =  await User.findByIdAndUpdate(id, body, {new:true});
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const deleteUser = async(req, res)=>{
    const { id } = req.params;

    try {
        const isDeleted = await User.findByIdAndDelete(id);
        if(isDeleted){
            return res.send({message:"Deleted Successfully"})
        }
        res.send("Not Found")
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const getDetailToken = async (req, res)=>{
    const user = req.user; 

    try {
        const dbUser = await User.findById(user.id);
        res.send(dbUser);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const uploadUserImage = async(req ,res)=>{
    try{
        const data = await uploadToCloudinary(req.file.path , "user-images")
        //Save Image Url and PubliId to the database
        const saveImg = await User.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    profileImg: data.url,
                },
            }
        );
        res.status(200).send("user image upladed with success!")
    }catch(err){
        res.status(400).send(err)
    }
}


module.exports = { login, register, updatedUser, getUsers, deleteUser, getDetailToken};