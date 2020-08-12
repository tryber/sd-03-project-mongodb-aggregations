db.trips.aggregate([
  {
    $addFields: {
      tipo: "$usertype",
      duracaoMedia: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: "$tipo",
      duracaoMedia: { $avg: "$duracaoMedia" },
    },
  },
  {
    $project: {
      _id: 1,
      duracaoMedia: {
        $round: [{ $divide: ["$duracaoMedia", 60000 * 60] }, 2],
      },
    },
  },
]);
