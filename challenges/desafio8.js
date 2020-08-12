db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { airline: "$airlines" },
      pipeline: [
        {
          $match: {
            airplane: { $in: ["747", "380"] },
            $expr: { $eq: ["$airline.name", "$$airline"] },
          },
        },
        {
          $project: {
            name: "$airline.name",
            nome: "$$airline",
          },
        },
      ],
      as: "air_alliance",
    },
  },
  {
    $addFields: {
      _id: { $size: "$air_alliance" },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: "$_id" },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
