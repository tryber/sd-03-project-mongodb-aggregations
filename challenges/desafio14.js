db.trips.aggregate(
  {
    $group: {
      _id: "$bikeid",
      "duracaoMedia": {$avg: {$divide: [{$subtract: ["$stopTime", "$startTime"]}, 60000]}}
    }
  },
  {
    $sort: {
      media: -1
    }
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$media" }
    }
  },
  { $limit: 5 }
);
