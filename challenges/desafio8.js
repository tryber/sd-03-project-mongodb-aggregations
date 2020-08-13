db.air_routes.aggregate([
  {
    $match: {
      airplane: {
        $in: ["747", "380"],
      },
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      let: { airline: "$airline.name" },
      pipeline: [
        { $unwind: "$airlines" },
        {
          $match: {
            $expr: {
              $eq: ["$airlines", "$$airline"],
            },
          },
        },
        {
          $project: { _id: 0, name: 1 },
        },
      ],
      as: "air_alliance",
    },
  },
  {
    $group: {
      _id: "$air_alliance.name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $unwind: "$_id",
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  { $limit: 1 },
]);
