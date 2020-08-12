db.trips.aggregate([
  {
    $group: {
      "_id": "$usertype",
      "duracaoMedia": { $avg:{ $subtract: [ "$stopTime", "$startTime" ] } },
    }
  },
  {
    $addFields: {
      "duracaoMedia": {
        $round: [
          { $divide: [ "$duracaoMedia", 60 * 60 * 1000 ] },
          2
        ]
      }
    }
  },
  {
    $sort: {
      "duracaoMedia": 1
    }
  },
  {
    $project: {
      "_id": 0,
      "tipo": "$_id",
      "duracaoMedia": "$duracaoMedia"
    }
  }
]);
