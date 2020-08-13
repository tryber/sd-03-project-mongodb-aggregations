db.trips.aggregate([{ $match: { "startTime": { $gte: ISODate("2016-03-10")}}},
  { $addFields: { "duracao": { $divide: [{ $subtract: ["$stopTime", "$startTime"]}, 60 * 1000 ]}}},
  { $group: { "_id": null, "duracaoMedia": { $avg: "$duracao" }}},
  { $project: { "_id": 0, "duracaoMediaEmMinutos": { $ceil: "$duracaoMedia" }}}
]);
