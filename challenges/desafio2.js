db.movies.aggregate([
  { $match: { "imdb.rating": { $gte: 7 } } },
  { $match: { genres: { $not: { $in: ["Crime", "Horror"] } } } },
  { $match: { rated: { $in: ["PG", "G"] } } },
  { $match: { languages: { $all: ["English", "Spanish"] } } },
  { $project: { _id: 0, titulo: "$title", avaliado: "$rated", notaIMDB: "$imdb.rating", votosIMDB: "$imdb.votes", ano: "$year" } }
]);
