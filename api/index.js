const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 1337;

const cabinRoutes = require("./routes/cabins");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "hello from cabinbooker API" });
});

app.use(cabinRoutes);
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`port listening on ${PORT}`);
});
