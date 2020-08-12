db.trips.aggregate([
  {
    $match: {
      "startTime": { $gte: ISODate("2016-03-10"), $lte: ISODate("2016-03-11") }
    }
  },
  {
    $group: {
      "_id": null,
      "duracaoMediaEmMinutos": { $avg:{ $subtract: [ "$stopTime", "$startTime" ] } }
    }
  },
  {
    $addFields: {
      "duracaoMediaEmMinutos": {
        $divide: [ "$duracaoMediaEmMinutos", 60 * 1000 ]
      }
    }
  },
  {
    $project: {
      "_id": 0,
      "duracaoMediaEmMinutos": {
        $round: [ "$duracaoMediaEmMinutos", 0 ]
      }
    }
  }
]);
