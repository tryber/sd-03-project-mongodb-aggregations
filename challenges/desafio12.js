db.trips.aggregate([
  { $addFields: { startDate: { $dayOfWeek: "$startTime" }}},
  { $match: { startDate: { $eq:5 }}},
  { $group: { _id: "$startStationName", result: {$sum: 1}}},
  { $project: { _id: 0, nomeEstacao: "$_id", total: "$result" }},
  { $sort: { total: -1 }}, {$limit: 1}
]);
