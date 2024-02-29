const {getFavorites, getSingleFavorites, createFavorites, updateFavorites, deleteFavorites} = require("../controllers/favoriteP.controller");
const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const router = Router();

router.get("/",auth, getFavorites); 
router.get("/:id", getSingleFavorites); 
router.post("/", createFavorites);
router.patch("/:id", updateFavorites);
router.delete("/:id", deleteFavorites);

module.exports = router;