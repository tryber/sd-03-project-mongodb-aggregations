db.trips.aggregate([
  {
    $addFields: {
      tempo: {
        $abs: {
          $subtract: ["startTime", "stopTime"],
        },
      },
    },
  },
  {
    $group: {
      _id: $usertype,
      duracaoMedia: { $avg: "tempo" },
    },
  },
  {
    $projject: {
      _id: 1,
      tipo: "$_id",
      duracaoMedia: {
        $round: [
          {
            $divide: [{ $avg: "duracaoMedia" }, 3600000],
          },
          2,
        ],
      },
    },
  },
  {
    $sort: {
      duracaoMedia: 1
    }
  }
]);
