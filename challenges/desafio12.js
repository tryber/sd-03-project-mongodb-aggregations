const dayMostTrips = Array.from(
  db.trips.aggregate([
    {
      $group: {
        _id: { $dayOfWeek: "$startTime" },
        total: { $sum: 1 },
      },
    },
    {
      $sort: { total: -1 },
    },
    {
      $project: {
        _id: 0,
        diaDaSemana: "$_id",
        total: 1,
      },
    },
    { $limit: 1 },
  ])
)[0].diaDaSemana;

db.trips.aggregate([
  {
    $group: {
      _id: {
        diaDaSemana: { $dayOfWeek: "$startTime" },
        nomeEstacao: "$startStationName",
      },
      total: { $sum: 1 },
    },
  },
  {
    $match: { "_id.diaDaSemana": dayMostTrips },
  },
  {
    $sort: { total: -1 },
  },
  { $limit: 1 },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.nomeEstacao",
      total: 1,
    },
  },
]);
