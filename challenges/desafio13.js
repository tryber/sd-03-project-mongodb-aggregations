db.trips.aggregate([
    {
      $match: {
        startTime: { $exists: 1, $ne: "", $gte: ISODate("2016-03-10"), $lt: ISODate("2016-03-11") },
        stopTime: { $exists: 1, $ne: "" },
      },
    },
    {
      $addFields: {
        duracaoEmMinutos: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
        },
      },
    },
    {
      $group: {
        _id: null,
        duracaoMediaEmMinutos: { $avg: "$duracaoEmMinutos" } 
      },
    },
    {
      $project: {
        _id: 0,
        duracaoMediaEmMinutos:{ $ceil:"$duracaoMediaEmMinutos"}
      },
    },
  ]).pretty();
