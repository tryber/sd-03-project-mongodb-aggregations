db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { nameTest: "$airlines" },
      pipeline: [
        {
          $match: {
            airplane: { $in: ["747", "380"] },
            $expr: { $eq: ["$airline.name", "$$nameTest"] }
          }
        }
      ],
      as: "rout"
    }
  },
  { $unwind: "$rout" },
  {
    $group: { 
      _id: "$name",
      totalRotas: { $sum: 1 }
    }
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 }
]);
