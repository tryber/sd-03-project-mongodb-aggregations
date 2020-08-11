db.air_alliances.aggregate([
  {
    $unwind: "$airlines"
  },
  {
    $lookup: {
      from: "air_routes",
      let: {
        airline_name: "$airlines"
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$$airline_name", "$airline.name"]
            },
            airplane: {
              $in: ["747", "380"]
            }
          }
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: 1
            }
          }
        },
        {
          $project: {
            _id: 0
          }
        },
      ],
      as: "totalViagens"
    }
  },
  {
    $unwind: "$totalViagens"
  },
  {
    $project: {
      name: 1,
      totalViagens: "$totalViagens.total"
    }
  },
  {
    $group: {
      _id: "$name",
      totalRotas: {
        $sum: "$totalViagens"
      }
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
