db.movies.aggregate([
  { $match: { "imdb.rating": { $gte: 7 } } },
  { $match: { genres: { $not: { $in: ["Crime", "Horror"] } } } },
  { $match: { rated: { $in: ["PG", "G"] } } },
  { $match: { languages: { $all: ["English", "Spanish"] } } }
]);
