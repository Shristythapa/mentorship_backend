const router = require("express").Router();
const mentorController = require("../controllers/mentorController");

router.post("/signup", mentorController.signUpMentor);
router.post("/login", mentorController.loginMentor);
router.get("/getAllMentors", mentorController.getAllMentors);
router.get("/getAllMentorsById", mentorController.getMentorById);
router.get("/findByEmail/:email", mentorController.findByEmail);
router.get("/getMentorProfile/:email", mentorController.getMentorProfile);
router.get("/getMentorById/:id", mentorController.getMentorById);
router.post("/forgotPassword", mentorController.changePassword);
router.post("/updatePassword/:id/:token", mentorController.updatePassword);
module.exports = router;
