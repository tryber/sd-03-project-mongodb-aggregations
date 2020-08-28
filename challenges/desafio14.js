db.trips.aggregate([
  {
    $addFields: {
      "count": {
        // Divide o resultadoda subtração por 60 mil ms
        $divide: [{
          $abs: {
            $subtract: ["$stopTime", "$startTime"]
          }
        }, 60000]
      }
    }
  },
  {
    $group: {
      "_id": "$bikeid",
      "duracaoMedia": { $avg: "$count" }
    }
  },
  {
    $project: {
      "_id": 0,
      "bikeId": "$_id",
      "duracaoMedia": {
        $ceil: "$duracaoMedia"
      }
    }
  },
  {
    $sort: {
      "duracaoMedia": -1
    }
  },
  {
    $limit: 5
  }
]);
