db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { al: "$airlines" },
      pipeline: [
        { $match: {$and: [{$expr: {$eq: ["$airline.name", "$$al"]}},{ airplane: { $in: ["747", "380"] }  }] }},
        { $group: { _id: "$airline.name", count: { $sum: 1 } } },
        { $project:  {_id: 1, count: 1} }
      ],
      as: "data"
    }
  },
  {$unwind: "$data"},
  {$project: {_id: "$data._id", totalRotas: "$data.count"}}
]);
