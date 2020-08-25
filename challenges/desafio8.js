db.air_alliances.aggregate([
  { $match: {
    $or: [{ airplane: "747"}, {airplane: "380"}],
    },
  },
  { $lookup: {
    from: "air_alliances",
    let: { airline: "$airline.name" },
    pipeline: [
      { $unwind: "$airlines" },
      { $match: {
        $expr: { $eq: [ "$airlines", "$$airline" ] },
      } },
      { $project: {
        _id: 0, 
        name: 1
      } },
    ],
    as: "air_alliance"
  } },
  { $group: {
    _id: "$air_alliance.name",
    totalrotas: { $sum: 1 }
  } },
  { $unwind: "$_id"},
  { $sort: { totalrotas: -1 } },
  { $limit: 1 }
]);
