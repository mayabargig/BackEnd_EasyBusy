const {getPayment, getSinglePayment, createPayment, updatePayment, deletePayment } = require("../controllers/payment.controller");
const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const router = Router();

router.get("/", getPayment); 
router.get("/:id", getSinglePayment); 
router.post("/",auth, createPayment);
router.patch("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;