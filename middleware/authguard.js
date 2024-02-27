const jwt = require("jsonwebtoken");

const mentorAuthGuard = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({
      success: false,
      message: "Authorization header not found",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.json({
      message: "Token not found",
      success: false,
    });
  }

  try {
    const decodeUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decodeUser;

    console.log(req.user);

    if (!req.user.mentor) {
      return res.json({
        success: false,
        message: "Permission denied!!! :(",
      });
    }

    //check if user is admin or not

    next();
  } catch (e) {
    res.json({
      message: "Inavalid token",
      success: false,
    });
  }
  console.log(req.headers);
};

const menteeAuthGuard = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({
      success: false,
      message: "Authorization header not found",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.json({
      message: "Token not found",
      success: false,
    });
  }

  try {
    const decodeUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decodeUser;

    console.log(req.user);

    if (req.user.mentor) {
      return res.json({
        success: false,
        message: "Permission denied!!! :(",
      });
    }

    //check if user is admin or not

    next();
  } catch (e) {
    res.json({
      message: "Inavalid token",
      success: false,
    });
  }
  console.log(req.headers);
};

module.exports = {
  mentorAuthGuard,
  menteeAuthGuard
};
