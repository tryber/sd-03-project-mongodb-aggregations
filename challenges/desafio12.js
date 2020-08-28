db.trips.aggregate([
  {
    $addFields: {
      "diaDaSemana": { $dayOfWeek: "$startTime" }
    }
  },
  {
    // Referencia resultado desafio 11
    $match: {
      "diaDaSemana": 5
    }
  },
  {
    $group: {
      "_id": "$startStationName",
      "count": { $sum: 1 }
    }
  },
  {
    $sort: { "count": -1 }
  },
  {
    $limit: 1
  },
  {
    $project: {
      "_id": 0,
      "nomeEstacao": "$_id",
      "total": "$count"
    }
  }
]);
