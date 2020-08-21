db.trips.aggregate([
  { $addFields: { "dia": { $dayOfWeek: "$startTime" } } },
  { $group: {
    "_id": "$dia",
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
