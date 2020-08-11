db.air_routes.aggregate([
  { $match: {
    airplane: { $in: ["747", "380"] }
  } },
  { $lookup:{
    from: "air_alliances"
  } },
  { $sort: { totalRotas: 1 } },
  { $limit: 1 }
]);
