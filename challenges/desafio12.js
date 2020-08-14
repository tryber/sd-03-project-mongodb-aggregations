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
      let: { dayOfWeek: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: [{ $dayOfWeek: "$startTime" }, "$$dayOfWeek"],
            },
          },
        },
        {
          $group: {
            _id: "$startStationName",
            total: { $sum: 1 },
          },
        },
        { $sort: { total: -1 } },
        { $limit: 1 },
        { $project: { _id: 1, total: 1 } },
      ],
      as: "station",
    },
  },
  { $unwind: "$station" },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$station._id",
      total: "$station.total",
    },
  },
]);
