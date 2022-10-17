const jwt = require("jsonwebtoken");
const { createResponseMessage } = require("../../utils");
const isAdmin = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    return res
      .status(403)
      .json(createResponseMessage({ status: false, message: "Forbidden" }));
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!user.isAdmin) {
      return res
        .status(403)
        .json(createResponseMessage({ status: false, message: "Forbidden" }));
    }
    next();
  } catch (error) {
    res
      .status(400)
      .json(createResponseMessage({ status: false, message: "Invalid token" }));
  }
};

module.exports = { isAdmin };
