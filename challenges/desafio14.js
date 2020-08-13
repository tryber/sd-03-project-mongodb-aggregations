db.trips.aggregate([{ $addFields: { "duracao": { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000 ]}}},
  { $group: { "_id": "$bikeid", "duracaoMediaMin": { $avg: "$duracao" }}},
  { $project: { "_id": 0, "bikeId":"$_id" , "duracaoMedia": { $ceil: "$duracaoMediaMin" }}},
  {$sort: { "duracaoMedia": -1 } }, { $limit: 5 }
]);
