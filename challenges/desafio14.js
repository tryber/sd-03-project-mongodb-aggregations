db.trips.aggregate([
  { $addFields: {
    "duracaoEmMinutos": {
      $divide: [{
        $abs: {
          $subtract:  ["$startTime", "$stopTime"]
        }
      }, 60000] }
  } },
  { $group: {
      "_id": "$bikeid",
      "duracaoMedia": { $avg: "$duracaoEmMinutos"}
  } },
  { $project: {
      "_id": 0,
      "bikeId": "$_id",
      "duracaoMedia": { $ceil: "$duracaoMedia" }
  } },
  { $sort: { "duracaoMedia": -1 } },
  { $limit: 5 }
]);
