db.trips.aggregate([
  {$group: {
    "_id": null,
    "tipo": "$usertype",
    "duracaoMedia": {
      $subtract: ["$startTime", "$stopTime"]
    }
  }}
]);
