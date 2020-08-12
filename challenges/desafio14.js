db.trips.aggregate([
  {
    $addFields: {
      time: {
        $subtract: ["$stopTime", "$startTime"]
      }
    }
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: "$time"      
      }
    }
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: {$divide: ["$duracaoMedia", 1000 * 60]}
      }
    }
  },
  {
    $sort: {
      duracaoMedia: -1
    }
  },
  {
    $limit: 5
  }
]);
