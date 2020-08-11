db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      totalViagens: { $sum: 1 }
    }
  },
  {
    $group: {
      _id: "$startStationName",
      totalEstacao: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$totalViagens"
    }
  },
  {
    $sort: {
      total: -1,
    }
  },
  {
    $limit: 1
  }
]);
