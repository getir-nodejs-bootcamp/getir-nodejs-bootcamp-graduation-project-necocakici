const express = require("express");
const { validate } = require("../middlewares/validate");
const { fetchRecordsWithCondition } = require("../controllers/records");
const { fetchWithDateAndCount } = require("../validations/record");

const router = express.Router();

router.post("/",validate(fetchWithDateAndCount, "body"), fetchRecordsWithCondition);

module.exports = router;