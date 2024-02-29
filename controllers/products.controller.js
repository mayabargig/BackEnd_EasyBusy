const { Product } = require("../models/products.model");

const getProducts = async (req, res) => {
    try {
        const query = req.query;
        const products = await Product.find({...query});
        res.send(products);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const getSingleProduct = async (req, res) => {
    const { id, userId } = req.params;
    try {
        console.log({id});
        const product = await Product.findById(id).populate(userId);
        res.send(product);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const createProduct = async (req, res) => {
    const body = req.body;

    try {
        console.log(req.user);
        body.userId = req.user.id;
        const newProduct = new Product(body);
        newProduct.id= newProduct._id;
        await newProduct.save();
        res.send({ message: "Product Send Successfully", data: body });
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    };
};

const updateProduct = async(req, res)=>{
    const body = req.body;
    const { id } = req.params;

    try {
        const product =  await Product.findByIdAndUpdate(id, body, {new:true});
        res.send(product);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const deleteProduct =async(req, res)=>{
    const { id } = req.params;

    try {
        const isDeleted = await Product.findByIdAndDelete(id);
        if(isDeleted){
            return res.send({message:"Deleted Successfully"})
        }
        return res.status(404).send("Not Found");
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

module.exports = { getProducts, getSingleProduct, createProduct, updateProduct, deleteProduct };