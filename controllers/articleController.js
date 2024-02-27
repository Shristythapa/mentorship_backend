const Article = require("../model/article");

const createArticle = async (req, res) => {
  const { mentorId, title, body, mentorName, mentorEmail, profileUrl } =
    req.body;
  //   const { mentorImage } = req.files;
  console.log(title, body, mentorName, mentorEmail, profileUrl);
  if (
    !mentorId ||
    !title ||
    !body ||
    !mentorName ||
    !mentorEmail ||
    !profileUrl
  ) {
    return res.status(400).json({
      success: false,
      message: "Please enter all feilds",
    });
  }

  try {
    const newArticle = new Article({
      mentorId: mentorId,
      title: title,
      body: body,
      mentorName: mentorName,
      mentorEmail: mentorEmail,
      profileUrl: profileUrl,
    });

    await newArticle.save();

    res.status(200).json({
      success: true,
      message: "Article created sucessfully",
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteArticle = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Invalid id",
    });
  }
  try {
    const article = await Article.findByIdAndDelete(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Mentor Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Article deleted",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Server error",
      succes: false,
    });
  }
};

const getAllArticle = async (req, res) => {
  try {
    // console.log(req.params.id);
    const requestedPage = req.query.page;
    const resultPerPage = req.query.limit;
    console.log(req.query.page);
    console.log(req.query.limit);
    console.log("Getting all articles...");
    const articles = await Article.find()
      .skip((requestedPage - 1) * resultPerPage)
      .limit(resultPerPage);
    if (!articles) {
      console.log("article not found");
      return res.status(400).json({
        success: false,
        messgae: "Articles not found",
      });
    }
    console.log("article found");
    return res.status(200).json({
      success: true,
      message: "Article List",
      articles: articles,
      count: articles.length,
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createArticle,
  deleteArticle,
  getAllArticle,
};
