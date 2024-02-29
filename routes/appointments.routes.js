const {getAppointment, getSingleAppointment, createAppointment, updateAppointment,
deleteAppointment, sendEmail } = require("../controllers/appointments.controller");
const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const router = Router();

router.get("/", getAppointment); 
router.get("/:date", getSingleAppointment); 
router.post("/",auth, createAppointment);
router.patch("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);
router.post("/sendEmail", sendEmail);

module.exports = router;