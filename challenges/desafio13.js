db.trips.aggregate([
  { $match: {
    startTime: { $gte: ISODate("2016-03-10"), $lt: ISODate("2016-03-11") }
  } },
  { $addFields: {
    "duracaoEmMinutos": {
      $divide: [{
        $abs: {
          $subtract:  ["$startTime", "$stopTime"]
        } }, 60000] }
  } },
  { $group: {
    _id: null,
    duracaoMediaEmMinutos: { $avg: "$duracaoEmMinutos"}
  } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" }
  } }
]);
