const router = require("express").Router();
const menteeController = require("../controllers/menteeControllers");

router.post("/signup", menteeController.signUpMentee);
router.post("/login", menteeController.loginMentee);
router.post("/forgotPassword", menteeController.changePassword);
router.post("/updatePassword/:id/:token", menteeController.updatePassword);
module.exports = router;
