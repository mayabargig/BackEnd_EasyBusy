const { getAdministrators, loginAdmin, registerAdmin, updatedAdmin, deleteAdmin } = require("../controllers/admin.user.controller");
const { Router } = require("express");
const router = Router();

router.get("/", getAdministrators);
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.patch("/:id", updatedAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
