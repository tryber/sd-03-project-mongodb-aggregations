db.trips.aggregate([
  {
    $match: {
      startTime: {
        $exists: 1,
        $gte: ISODate("2016-03-10"),
        $lt: ISODate("2016-03-11")
      },
      stopTime: { $exists: 1 }
    }
  },
  {
    $addFields: {
      count: {
        $divide: [{
          $abs: {
            $subtract: ["$stopTime", "$startTime"]
          }
        }, 60000]
      }
    }
  },
  {
    $group: {
      _id: null,
      duracaoMediaEmMinutos: { $avg: "$count" }
    }
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: {
        $ceil: "$duracaoMediaEmMinutos"
      }
    }
  }
]);
