db.trips.aggregate([
  { $addFields: { tripTime: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000] } } },
  { $group: { _id: "$bikeid", media: { $avg: "$tripTime" } } },
  { $sort: { media: -1 } },
  { $project: { _id: 0, bikeId: "$_id", duracaoMedia: { $ceil: "$media" } } },
  { $limit: 5 }
]);
