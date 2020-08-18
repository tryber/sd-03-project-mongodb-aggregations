db.air_alliances.aggregate([
  {$lookup: {
    from: "air_routes",
    localField: "airlines",
    foreignField: "airline.name",
    as: "Name"
  }},
]);
