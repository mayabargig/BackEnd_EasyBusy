const { Favorites } = require("../models/favoriteP.model");

const getFavorites = async (req, res) => {
    const { userId } = req.params;

    try {
        const favorites = await Favorites.find({userId}).populate("userId");
        console.log(favorites);
        res.send(favorites);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};


const getSingleFavorites = async (req, res) => {
    const { id } = req.params;
    try {
        console.log({id});
        const favorites = await Favorites.findById(id)
        .populate("userId")
        // .populate("product")
        res.send(favorites);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const createFavorites = async (req, res) => {
    const body = req.body;
    console.log(body);

    try {
        const newFavorites = new Favorites(body);
        console.log(newFavorites);
        await newFavorites.save();
        res.status(201).send({ message: "Favorites Send Successfully", data: newFavorites });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error", error: error.message });
    };
};

const updateFavorites = async(req, res)=>{
    const body = req.body;
    const { id } = req.params;

    try {
        const favorites =  await Favorites.findByIdAndUpdate(id, body, {new:true});
        res.send(favorites);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const deleteFavorites =async(req, res)=>{
    const { id } = req.params;

    try {
        const isDeleted = await Favorites.findByIdAndDelete(id);
        if(isDeleted){
            return res.send({message:"Deleted Successfully"})
        }
        return res.status(404).send("Not Found");
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

const deleteFavByProductId = async (req, res) => {
    const { userId, product } = req.params;
    console.log(req.params);

    try {
        // const isDeleted = await Favorites.deleteOne({ userId:userId, product: productId }).populate("userId","product");
        const isDeleted = await Favorites.deleteOne({ userId, product });
        if (isDeleted.deletedCount > 0) {
            return res.send({ message: "Deleted Successfully" });
        }
        return res.status(404).send("Not Found");
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
};

module.exports = { getFavorites, getSingleFavorites, createFavorites, updateFavorites, deleteFavorites, deleteFavByProductId };