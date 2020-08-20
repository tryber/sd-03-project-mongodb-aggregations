db.trips.aggregate([
  {
    $project: {
      teste: { $dayOfWeek: "$startTime"}
    }
  }
])

db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime"},
      total: { $sum: 1}
    }
  },
  {
    $sort: {
      total: -1
    }
  },
  {
    $limit: 1
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$total"
    }
  }
]);
