const {getFavorites, getSingleFavorites, createFavorites, updateFavorites, deleteFavorites, deleteFavByProductId} = require("../controllers/favoriteP.controller");
const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const router = Router();

router.get("/user/:userId", getFavorites); 
router.get("/:id", getSingleFavorites); 
router.post("/", createFavorites);
router.patch("/:id", updateFavorites);
router.delete("/delete/:userId/:product", deleteFavByProductId); 
router.delete("/:id", deleteFavorites);

module.exports = router;