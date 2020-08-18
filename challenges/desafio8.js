db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {$lookup : {
      from: "air_routes",
      localField: { "airplane" : {$in : ["747", "380"]}},
      foreignField: "",
      as: "totalRotas"
    }
  },
  {
    $group: {
      "_id": "$airlines"
    }
  },
  {
    $project: {
      "_id": 1,
      "totalRotas": 1
    }
  },
]);
