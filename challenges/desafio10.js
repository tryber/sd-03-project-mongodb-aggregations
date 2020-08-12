db.trips.aggregate([
  {
    $match: {
      usertype: { $in: ["Subscriber", "Customer"] }
    }
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: { $subtract: ["$startTime", "$stopTime"] } }
    }
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", 1000 * 60 * 60] }, 2] },
    }
  },
  {
    $sort: {
      duracaoMedia: -1
    }
  }
]);
