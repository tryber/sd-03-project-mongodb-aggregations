db.trips.aggregate([
  {
    $match: {
      "birthYear": { $nin: [ "" ], $exists: true }
    }
  },
  {
    $group: {
      "_id": null,
      "maiorAnoNascimento": { $max: { $toInt: "$birthYear" } },
      "menorAnoNascimento": { $min: { $toInt: "$birthYear" }  }
    }
  },
  {
    $project: {
      "_id": 0
    }
  }
]);
