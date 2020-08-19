db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    let: { nome: "$airlines" },
    pipeline: [
      { $match: {
        airplane: { $in: [ "747", "380" ] },
        $expr: { $eq: [ "$airline.name", "$$route" ] },
      } },
      { $project: {
        _id: 0, 
        route: "$$route"
      } },
    ],
    as: "routes"
  } },
  { $addFields: {
    rotas: { $size: "$routes" }
  } },
  { $sort: {totalrotas: -1 } },
  { $limit: 1 }
]);
