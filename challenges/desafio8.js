db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { airlinesData: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$airline.name", "$$airlinesData"] },
            "airplane": { $in: ["747", "380"] },
          },
        },
      ],
      as: "airplaneInfo",
    },
  },
  { $unwind: "$airplaneInfo" },
  { $group: { _id: "$name", "totalRotas": { $sum: 1 } } },
  { $project: { _id: 1, "totalRotas": 1 } },
  { $sort: { "totalRotas": -1 } },
  { $limit: 1 },
]);
