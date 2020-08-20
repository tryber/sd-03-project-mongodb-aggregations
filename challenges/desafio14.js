db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: {
          $divide: [{ $abs: { $subtract: ["$startTime", "$stopTime"] } }, 1000 * 60]
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      bikeID: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" }
    }
  },
  {
    $sort: {
      duracaoMedia: -1
    }
  },
  {
    $limit: 5
  }
]);
