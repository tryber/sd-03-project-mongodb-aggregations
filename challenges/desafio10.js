db.trips.aggregate([
  {
    $addFields: { "total": { $abs: { $subtract: ["$startTime", "$stopTime"] } } }
  },
  {
    $group: { 
      _id: "$userType",
      duracaoMedia: { $avg: "$total" }
    }
  },
  { $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", 360000] }, 2] }
  } },
  { $sort: { duracaoMedia: 1 } }
]);
