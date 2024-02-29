const { Cart } = require("../models/cart.model");

const getCart = async (req, res) => {
    try {
        const query = req.query;
        console.log({query});
        const cart = await Cart.find({...query});
        res.send(cart);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const getSingleCart = async (req, res) => {
    const { id } = req.params;
    try {
        console.log({id});
        const cart = await Cart.findById(id)
        .populate("userId")
        // .populate("product")
        res.send(cart);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const addToCart = async (req, res) => {
    const body = req.body;
    console.log(body);

    try {
        const newCart = new Cart(body);
        console.log(newCart);
        await newCart.save();
        res.status(201).send({ message: "Favorites Send Successfully", data: newCart });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error", error: error.message });
    };
};

const updateCart = async(req, res)=>{
    const body = req.body;
    const { id } = req.params;

    try {
        const cart =  await Cart.findByIdAndUpdate(id, body, {new:true});
        res.send(cart);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const deleteCart =async(req, res)=>{
    const { id } = req.params;

    try {
        const isDeleted = await Cart.findByIdAndDelete(id);
        if(isDeleted){
            return res.send({message:"Deleted Successfully"})
        }
        return res.status(404).send("Not Found");
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

module.exports = { getCart, getSingleCart, addToCart, updateCart, deleteCart };