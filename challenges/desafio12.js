db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      total: { $sum: 1 },
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  {
    $lookup: {
      from: "trips",
      let: { diaDaSemana1: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: [{ $dayOfWeek: "$startTime" }, "$$diaDaSemana1"],
            },
          },
        },
        {
          $project: {
            _id: 0,
            name: "$startStationName",
          },
        },
      ],
      as: "stations",
    },
  },
  { $unwind: "$stations" },
  {
    $group: {
      _id: "$stations.name",
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id",
      total: 1,
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
