db.movies.aggregate([
  { $match: { $and: [{ countries: "Estados Unidos" }, { "tomatoes.viewer.rating": { $gte: 3 } }] } },
  { $group: { _id: 1} },
  { $addFields: { num_favs: {} } }
]);
