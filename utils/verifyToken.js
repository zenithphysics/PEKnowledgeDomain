const localStorage = require("./localStorage");

const verifyToken = (req, res, next) => {
  const peheader = req.headers["access-token"];
  if (typeof peheader !== "undefined") {
    const peToken = peheader;
    req.token = peToken;
    next();
  } else {
    res.status(403).json("Sorry you are Forbidden to do so!!");
  }
};

module.exports = verifyToken;
