const {getProducts, getSingleProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/products.controller");
const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const router = Router();

router.get("/", getProducts); // specific link by userId
router.get("/:id", getSingleProduct); //specific link by id
router.post("/", auth, createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;