db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    let: { nome: "$airlines" },
    pipeline: [
      { $match: {
        airplane: { $in: ["747", "380"] },
        $expr: { $eq: ["$airline.name", "$$nome"] },
      } },
      { $project: {
        name: "$airline.name",
        nome: "$$nome"
      } },
    ],
    as: "routes"
  } },
  { $addFields: {
    nRotas: { $size: "$routes" }
  } },
  { $group: {
    _id: "$name",
    totalRotas: { $sum: "$nRotas" }
  } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 }
]);
