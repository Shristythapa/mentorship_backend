const router = require("express").Router();
const sessionController = require("../controllers/sessionController");
const { mentorAuthGuard } = require("../middleware/authguard");
const { menteeAuthGuard } = require("../middleware/authguard");

router.post("/create", sessionController.createSession);
router.get("/getAllSessions", sessionController.getAllSessions);
router.delete("/deleteSession/:id", sessionController.deleteSessions);
router.get("/getSessionById/:id", sessionController.getSessionById);
router.put("/joinSession/:id", sessionController.joinSession);
router.get("/mentorSessions/:id", sessionController.getSessionsByMentorId);
router.put("/startSession/:id", sessionController.startSession);
router.put("/endCall/:id", sessionController.endCall);
module.exports = router;
