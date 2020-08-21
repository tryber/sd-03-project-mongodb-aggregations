db.air_routes.aggregate(
  [
    {
      $match: {
        "airplane": {
          $in: [ "747", "380" ],
        },
      },
    },
    {
      $lookup: {
        from: "air_alliances",
        localField: "airline.name",
        foreignField: "airlines",
        as: "family",
      }
    },
    {
      $match: {
        "family.name": {
          $in: [ "Star Alliance", "SkyTeam", "OneWorld" ],
        },
      },
    },
    {
      $group: {
        _id: "$family.name",
        totalRotas: {
          $sum: 1,
        }
      },
    },
    {
      $unwind: "$_id",
    },
    {
      $sort: {
        "totalRotas": -1,
      },
    },
    {
      $limit: 1,
    },
  ]
);
