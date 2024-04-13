const { login, register, updatedUser, deleteUser, getUsers, getDetailToken } = require("../controllers/users.controller");
const { Router } = require("express");
const { auth, authorize } = require("../middlewares/auth");
const router = Router();

router.get("/", getUsers);
router.post("/register", register);
router.post("/login", login);
router.patch("/:id",auth, authorize(["regular", "admin"]), updatedUser);
router.delete("/:id",auth,authorize([ "admin"]), deleteUser);
router.get("/init-user",auth, getDetailToken);

module.exports = router;