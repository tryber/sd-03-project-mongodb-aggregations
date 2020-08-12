db.trips.aggregate(
  {
    $group: {
      _id: "$bikeid",
      "duracaoMedia": {$avg: {$divide: [{$subtract: ["$stopTime", "$startTime"]}, 60000]}}
    }
  },
  {
    $project: {
      _id: 1,
      "duracaoMedia": {$ceil: "$duracaoMedia"}
    }
  },
  {$sort: { "duracaoMedia": -1 }},
  {$limit: 5}
);
