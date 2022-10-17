const express = require("express");
const router = express.Router();

const {
  getBookedCabins,
  getAvailableCabins,
  bookCabin,
} = require("../../controllers/cabins");
const { isAdmin } = require("../../middlewares/auth");

router.get("/cabins", getAvailableCabins);
router.post("/cabin", bookCabin);
router.get("/admin/cabins", isAdmin, getBookedCabins);

module.exports = router;
