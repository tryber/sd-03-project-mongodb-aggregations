const position = db.trips.aggregate(
  [
    {
      $addFields: {
        diaDaSemana: {
          $dayOfWeek: "$startTime",
        },
      },
    },
    {
      $group: {
        _id: "$diaDaSemana",
        total: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        "_id": 0,
        "diaDaSemana": "$_id",
        "total": "$total",
      },
    },
    {
      $sort: {
        "total": -1,
      }
    },
    {
      $limit: 1,
    },
  ]
).toArray()[0].diaDaSemana;

db.trips.aggregate(
  [
    {
      $addFields: {
        diaDaSemana: {
          $dayOfWeek: "$startTime",
        },
      },
    },
    {
      $group: {
        _id: {
          diaDaSemana: "$diaDaSemana",
          nomeEstacao: "$startStationName"
        },
        total: {
          $sum: 1,
        },
      },
    },
    {
      $match: {
        "_id.diaDaSemana": position,
      },
    },
    {
      $sort: {
        "total": -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        "_id": 0,
        "nomeEstacao": "$_id.nomeEstacao",
        "total": "$total",
      },
    },
  ]
);
