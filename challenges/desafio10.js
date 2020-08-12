db.trips.aggregate([
  { $addFields: {
    "tempoTotal": {
      $abs: {
        $subtract: ["$startTime", "$stopTime"]
      }
    }
  } },
  { $group: {
    "_id": "$usertype",
    "duracaoMedia": { $avg: "$tempoTotal" }
  } },
  { $project: {
    "_id": 0,
    "tipo": "$_id",
    "duracaoMedia": {
      $round: [{
        $divide: ["$duracaoMedia", 3600000]
      }, 2]
    }
  } },
  { $sort: { "duracaoMedia": 1 } }
]);
