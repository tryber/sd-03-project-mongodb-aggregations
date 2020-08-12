db.trips.aggregate([
  {
    $addFields: {
      lala: {$dayOfWeek: "$startTime"}
    }
  },
  {
    $match: {
      lala:{$eq:5}
    }
  },
  {
    $group:{
      _id: "$startStationName",
      cont: {$sum: 1}
    }
  },
  {
    $project:{
      _id: 0,
      nomeEstacao: "$_id",
      total: "$cont"
    }
  },
  {
    $sort: {
      total: -1
    }
  },
  {$limit: 1}
]);
