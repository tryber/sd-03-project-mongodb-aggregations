db.trips.aggregate([
  { $group: { _id: { $dayOfWeek: "$startTime" }, total: { $sum: 1 } } },
  { $project: { _id: 0, diaDaSemana: "$_id", total: 1 } },
  { $sort: { total: -1 } },
  { $limit: 1 },
  {
    $lookup: {
      from: "trips",
      let: { dia: "$diaDaSemana" },
      pipeline: [
        { $match: { $expr: { $eq: [{ $dayOfWeek: "$startTime" }, "$$dia"] } } },
        { $group: { _id: "$startStationName", total: { $sum: 1 } } },
        { $project: { _id: 0, nomeEstacao: "$_id", total: 1 } },
        { $sort: { total: -1 } },
        { $limit: 1 },
      ],
      as: "trip",
    },
  },
  { $project: { trip: { $arrayElemAt: ["$trip", 0] } } },
  { $project: { nomeEstacao: "$trip.nomeEstacao", total: "$trip.total" } },
]);
