const ApiError = require("../errors/ApiError");
const { getRecordsWithCondition } = require("../services/record");

const fetchRecordsWithCondition = async (req, res, next) => {
  const { body } = req;
  try {
    const records = await getRecordsWithCondition(body);
    console.log('records.length :>> ', records.length);
    res.status(200).json({
      code: 0,
      msg: "Success",
      records
    })
  } catch (err) {
    next(new ApiError("Internal Server error.", 500))
  }
};

module.exports = {
  fetchRecordsWithCondition,
};
