db.movies.aggregate([
  {$match: {
      $and: [
        { "imdb.rating": { $gte: 7 } },
        { "genre": { $nin: ["Crime", "Horror"] } },
        { "rated": { $in: ["PG", "G"] } },
        { "languages": { $all: ["English", "Spanish"] } }
      ]
    }
  }
]);