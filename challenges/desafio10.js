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
      _id: 0,
      tipo:"$_id",
      duracaoMedia: {
        $round: [{ $divide: ["$duracaoMedia", 60000 * 60] }, 2],
      },
    },
  },
]);
