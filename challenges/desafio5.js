db.movies.aggregate([
  {$match: {"countries": "USA"}},
  {$match: {"tomatoes.viewer.rating" : {$gte: 3}}},
  {$match: {cast: { $exists: true }}},
  {$addFields: {"atores_encontrados": {$setIntersection: ["$cast", ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"]]}}},
  {$addFields: {"num_favs": {$size: "$atores_encontrados"}}},
  {$sort: {"num_favs": -1, "tomatoes.viewer.rating": -1, "title": -1}},
  {$project: {"_id": 0, "title":true}},
  {$skip: 24},
  {$limit: 1}
]).pretty();
