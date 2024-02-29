const {getBusiness, getSingleBusiness, createBusiness, updateBusiness, deleteBusiness } = require("../controllers/business.controller");
const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const router = Router();

router.get("/", getBusiness); 
router.get("/:id", getSingleBusiness); 
router.post("/",auth, createBusiness);
router.patch("/:id", updateBusiness);
router.delete("/:id", deleteBusiness);

module.exports = router;