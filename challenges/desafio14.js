db.trips.aggregate([
  {
    $group: {
      "_id": "$bikeid",
      "duracaoMedia": { $avg: { $subtract: [ "$stopTime", "$startTime" ] } }
    }
  },
  {
    $addFields: {
      "duracaoMedia": {
        $divide: [ "$duracaoMedia", 60 * 1000 ]
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
  },
  {
    $project: {
      "_id": 0,
      "bikeId": "$_id",
      "duracaoMedia": {
        $ceil: "$duracaoMedia"
      }
    }
  }
]);
