const Record = require("../models/Record");

const getRecordsWithCondition = ({
  startDate,
  endDate,
  minCount,
  maxCount,
}) => {
  return Record.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lt: new Date(endDate),
        },
      }
    },
    {
      $project: {
        _id: 0,
        key: 1,
        createdAt: 1,
        totalCount: {
          $sum: "$counts",
        },
      },
    },
    {
      $match: {
        totalCount: { $gte: minCount, $lt: maxCount },
      },
    },
  ]);

};

module.exports = {
  getRecordsWithCondition,
};

/*{
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
  }*/

// { counts: { $elemMatch: { $gt: 110, $lt: 125 } } } PERF
