const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { readFile, createResponseMessage } = require("../../utils");

const login = async (req, res) => {
  const { username, pwd } = req.body;
  const admin = JSON.parse(await readFile("./data/users.json"));

  if (!username || !pwd) {
    return res.status(400).json(
      createResponseMessage({
        status: false,
        message: "Username or password wasn't provided",
      })
    );
  }

  if (username !== admin.user) {
    return res
      .status(403)
      .json(
        createResponseMessage({ status: false, message: "Wrong username" })
      );
  }

  const validPassword = await bcrypt.compare(pwd, admin.password);

  if (!validPassword) {
    return res
      .status(403)
      .json(
        createResponseMessage({ status: false, message: "Wrong password" })
      );
  }

  const accessToken = jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET);
  const { password, ...user } = admin;

  res.json(
    createResponseMessage({
      status: true,
      data: { ...user, accessToken: accessToken },
    })
  );
};

module.exports = { login };
