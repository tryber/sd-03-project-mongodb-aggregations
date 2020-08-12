db.movies.aggregate([
  { $match: { genres: { $not: { $in: ["Crime", "Horror"] } } } },
  { $match: { "imdb.rating": { $gte: 7 } } },
  { $match: { rated: { $in: ["PG", "G"] } } },
  { $match: { languages: { $all: ["English", "Spanish"] } } }
]);
