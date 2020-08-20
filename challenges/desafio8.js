db.air_routes.aggregate([{
    $match : {
      $or: [
        {"airplane": "747"},
        {"airplane": "380"}
      ]
    }
  },
  {
    $lookup: {
      from: "air_alliances",
      let: { airline_name: "$airline.name" },
      pipeline: [
        {$unwind: "$airlines"},
        {
          $match: {$expr:
          {$eq: [ "$airlines",  "$$airline_name" ]}
          }
        },
        { $project: {  _id: 0, name: 1 } }
      ], as: "lala"
    }
  },
  {
    $group: {
      _id: "$lala.name",
      totalRotas: {$sum : 1}
    }
  },
  { $unwind: "$_id" },
  {$sort: {"totalRotas":-1}},
  {$limit:1}
]);
