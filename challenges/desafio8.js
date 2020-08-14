db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { line_name: "$airlines"},
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$airline.name", "$$line_name"],
            },
            airplane: { $in: ["747", "380"] },
          },
        },
      ],
      as: "route",
    },
  },
  { $unwind: "$route" },
  { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
