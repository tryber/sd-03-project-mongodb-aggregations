db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10T00:00:00.000Z"),
        $lte: ISODate("2016-03-10T23:59:59.000Z")
      }
    }
  },
  {
    $addFields: {
      time: {
        $subtract: ["$stopTime", "$startTime"]
      }
    }
  },
  {
    $group: {
      _id: null,
      duracaoMedia: {
        $avg: {
          $ceil: { $divide: ["$time", 1000 * 60] }
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $toInt: "$duracaoMedia"
      }
    }
  }
]);
