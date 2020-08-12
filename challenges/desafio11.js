db.trips.aggregate(
  {
    $group: {
      _id: {$dayOfWeek: "$startTime"},
      total: {$sum: 1}
    }
  },
  {
    $project: {
      _id: 1,
      total: 1
    }
  },
  {$sort: { total: -1 }},
  {$limit: 1}
);
