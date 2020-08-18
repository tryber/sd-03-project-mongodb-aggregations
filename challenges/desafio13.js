db.trips.aggregate([
  {$match: {
    "startTime": {
      "$gte": new Date("2016-03-10"),
      "$lt": new Date("2016-03-11"),
      }
    }
  },
  {$project: {
    "duracaoMedia": {
      $divide : [
        {$subtract: ["$stopTime","$startTime"]},
        60000]
      }
    }
  },
  {$group: {
    "_id": null,
    "duracaoMediaEmMinutos": {$avg: "$duracaoMedia"}
  }},
  {$project: {
    "_id": 0,
    "duracaoMediaEmMinutos": {$ceil: "$duracaoMediaEmMinutos"}
  }}
]);
