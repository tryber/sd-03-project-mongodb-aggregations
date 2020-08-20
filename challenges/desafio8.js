db.air_alliances.aggregate([
  {
    $unwind: "$airlines"
  },
  {
    $lookup: {
      from: "air_routes",
      let: { airlines_a_name: "$airlines" },
      pipeline: [
        {
          $match: {
            $and: [
              { $expr: { $eq: ["$airline.name", "$$airlines_a_name"] } },
              { airplane: { $in: ["747", "380"] } }
            ]
          }
        },
        {
          $project: {
            name: "$airline.name",
            airplane: 1
          }
        }
      ],
      as: "air_routes_alliances"
    }
  },
  {
    $addFields: {
      routes_quantitys: { $size: "$air_routes_alliances" }
    }
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: "$routes_quantitys" },
    }
  },
  {
    $sort: {
      totalRotas: -1
    }
  },
  {
    $limit: 1
  }
]);
