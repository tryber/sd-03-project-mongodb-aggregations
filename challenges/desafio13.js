db.trips.aggregate([
  {$match: {startTime: {$gte: ISODate("2016-03-10T00:00:00.000Z"), $lt: ISODate("2016-03-11T00:00:00.000Z")}}},
  { $addFields: { totalTime: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000] } } },
  { $group: { _id: null, media: { $avg: "$totalTime" } } },
  { $project: { _id: 0, duracaoMediaEmMinutos: { $ceil: "$media" } } }
]);
