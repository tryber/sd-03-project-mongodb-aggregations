db.trips.aggregate([
  {
    $addFields: {
      date: {
        $dateToParts: { date: "$startTime" }
      }
    }
  },
  {
    $match: {
      "date.year": 2016,
      "date.month": 3,
      "date.day": 10
    }
  },
  {
    $group: {
      _id: "$date.year",
      duracaoMediaEmMinutos: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60]
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos"}
    }
  }
]);
