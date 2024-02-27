const router = require("express").Router()
const articleController = require("../controllers/articleController")
const { mentorAuthGuard } = require("../middleware/authguard");

router.post("/createArticle",articleController.createArticle );
router.post("/delteArticle/:id", articleController.deleteArticle)
router.get("/findAllArticles",articleController.getAllArticle);

module.exports = router;