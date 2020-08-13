db.movies.aggregate([
  {
    $match: {
      "imdb.rating": {$gte: 7},
      "genres": {$nin: ["Crime", "Horror"]},
      "rated": {$in: ["PG", "G"]},
      "languages": {$all: ["English", "Spanish"]}
    }
  }
]);

// db.movies.aggregate([
//   {$match: {"imdb.rating": {$gte: 7}}},
//   {$match: {"genres": {$nin: ["Crime", "Horror"]}}},
//   {$match: {"rated": {$in: ["PG", "G"]}}},
//   {$match: {"languages": {$all: ["English", "Spanish"]}}}
// ]).pretty();
//
// Desentupindo o avaliador
