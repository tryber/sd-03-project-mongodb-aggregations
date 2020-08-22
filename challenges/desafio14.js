db.trips.aggregate([
  {$group: {
      "_id": "$bikeid",
      "duracaoMedia": {$avg: { $subtract: [ "$stopTime", "$startTime" ]}}
    }},
  {$addFields: {
      "duration": {
        $divide: [ "$duration", 60 * 1000 ]
      }
    }},
  {$sort: {
      "duration": -1
    }},
  {$limit: 5},
  {$project: {
      "_id": 0,
      "bikeId": "$_id",
      "duration": {
        $ceil: "$duration"
      }
    }}
]);
