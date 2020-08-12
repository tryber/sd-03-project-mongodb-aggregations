db.trips.aggregate([
  {
    $addFields: {
      tempoViagem: {
        $abs: {
          $subtract: ["$startTime", "$stopTime"]
        }
      }
    }
  },
  {
    $group: {
      _id: "$usertype",
      "duracaoMedia": { $avg: "$tempoViagem" }
    }
  },
  {
    $project: {
      "_id": 0,
      "tipo": "$_id",
      "duracaoMedia": {
        $round: [
          { $divide: ["$duracaoMedia", 3600000] }
          , 2]
      }
    }
  },
  { $sort: { "duracaoMedia": 1 } }
]);
