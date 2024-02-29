const { Favorites } = require("../models/favoriteP.model");

const getFavorites = async (req, res) => {
    try {
        const query = req.query;
        console.log({query});
        const favorites = await Favorites.find({...query});
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

module.exports = { getFavorites, getSingleFavorites, createFavorites, updateFavorites, deleteFavorites };