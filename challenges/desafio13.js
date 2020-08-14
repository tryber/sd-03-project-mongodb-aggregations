db.trips.aggregate([
  {
    $project: {
      date: {
        $dateToParts: { date: "$startTime"}
      },
      startTime: 1,
      stopTime: 1,
    }
  },
  {
    $match: {
      "date.year": 2016,
      "date.month": 3,
      "date.day": 10,
    }
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
    },
  }
]);
