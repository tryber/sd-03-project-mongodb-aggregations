db.trips.aggregate([
  { $match: { startTime: { $gte: ISODate("2016-03-10"), $lt: ISODate("2016-03-11") } } },
  {
    $addFields: {
      "duracaoEmMinutos": { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] },
    },
  },
  { $group: { _id: null, "duracaoMediaEmMinutosBruta": { $avg: "$duracaoEmMinutos" } } },
  { $project: { _id: 0, "duracaoMediaEmMinutos": { $ceil: "$duracaoMediaEmMinutosBruta" } } },
]);
