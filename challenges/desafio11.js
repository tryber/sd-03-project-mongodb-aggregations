db.trips.aggregate([
  { $match: {
    "startTime": { $exists: 1 }
  } },
  { $addFields: {
    "diaDaSemana": { $dayOfWeek: "$startTime" },
  } },
  { $group: {
    "_id": "$diaDaSemana",
    "qntDeViagens": { $sum: 1 },
  } },
  { $sort: { "qntDeViagens": -1 } },
  { $limit: 1 },
  { $project: {
    "_id": 0,
    "diaDaSemana": "$_id",
    "total": "$qntDeViagens",
  } },
]);
