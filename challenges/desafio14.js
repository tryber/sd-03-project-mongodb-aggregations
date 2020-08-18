db.trips.aggregate([
  {$project: {
    "_id": null,
    "bikeId": "$bikeid",
    "duracaoMedia": {
      $divide : [
        {$subtract: ["$stopTime","$startTime"]},
        60000]
      }
    }
  },
  {$group: {
    "_id": "$bikeId",
    "duracaoMedia": {$avg: "$duracaoMedia"}
  }},
  {$project: {
    "_id": 0,
    "bikeId": "$_id",
    "duracaoMedia": {$ceil: "$duracaoMedia"}
  }},
  {$sort: {"duracaoMedia": -1}},
  {$limit: 5}
]);
