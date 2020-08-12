db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      media: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60] } }
    }
  },
  {
    $project:
    {
      _id: 0,
      bikeId: "$_id",
      duracaoMediaEmMinutos: { $ceil: "$media" }
    }
  },
  {
    $sort: {
      duracaoMediaEmMinutos: -1
    }
  },
  {
    $limit: 5
  }
]);
