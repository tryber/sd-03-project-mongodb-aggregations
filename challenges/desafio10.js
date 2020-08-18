db.trips.aggregate([
  {$project: {
    "_id": null,
    "tipo": "$usertype",
    "duracaoMedia": {
      $divide : [
        {$subtract: ["$stopTime","$startTime"]},
        3600000]
      }
    }
  },
  {$group: {
    "_id": "$tipo",
    "duracaoMedia": {$avg: "$duracaoMedia"}
  }},
  {$project: {
    "_id": 0,
    "tipo": "$_id",
    "duracaoMedia": {$round: ["$duracaoMedia", 2]}
  }},
  {$sort: {
    "duracaoMedia": 1
  }}
]);
