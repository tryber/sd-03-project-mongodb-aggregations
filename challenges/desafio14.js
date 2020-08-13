db.trips.aggregate([{ $addFields: { "duracao": { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000 ]}}},
  { $group: { "_id": "$bikeid", "duracaoMediaMinutos": { $avg: "$duracaoEmMinutos" }}},
  { $project: { "_id": 0, "bikeId":"$_id" , "duracaoMedia": { $ceil: "$duracaoMediaMinutos" }}},
  {$sort: { "duracaoMedia": -1 } }, { $limit: 5 }
]);
