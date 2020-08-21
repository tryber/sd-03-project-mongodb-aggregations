db.trips.aggregate([
  { $addFields: 
    { "travelTime": { $subtract: ["$stopTime", "$startTime"] } }
  },
  { $group: 
    { "_id": "$usertype", "duracaoMedia": { $avg: "$travelTime" } }
  },
  { $project: {
    "_id": 0,
    "tipo": "$_id",
    "duracaoMedia": {
        $round: [ { $divide: ["$duracaoMedia", 3600000] }, 2]
      }
    } 
  },
  { $sort: { "duracaoMedia": 1 } }
]);
