const {getCart, getSingleCart, addToCart, updateCart, deleteCart} = require("../controllers/cart.controller");
const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const router = Router();

router.get("/:userId", getCart); 
router.get("/:id", getSingleCart); 
router.post("/", addToCart);
router.patch("/:id", updateCart);
router.delete("/:id", deleteCart);

module.exports = router;