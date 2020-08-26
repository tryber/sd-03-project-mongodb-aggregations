db.air_alliances.aggregate([
  {
    // quebra em varios docs
    $unwind: "$airlines"
  },
  {
    $lookup: {
      // pra onde estou olhando
      from: "air_routes",
      let: { test: "$airlines" },
      pipeline: [
        {
          $match: {
            "airplane": { $in: ["747", "380"] },
            $expr: { $eq: ["$airline.name", "$$test"] }
          }
        }
      ],
      as: "rout"
    }
  },
  {
    $unwind: "$rout"
  },
  {
    $group: {
      "_id": "$name",
      "totalRotas": { $sum: 1 }
    }
  },
  {
    $sort: { "totalRotas": -1 }
  },
  {
    $limit: 1
  }
]);
