db.movies.aggregate([
  {
    $match: { awards: { $regex: /Won \d+ Oscars?/i } },
  },
  {
    $group: {
      _id: null,
      max: { $max: "$imdb.rating" },
      min: { $min: "$imdb.rating" },
      avg: { $avg: "$imdb.rating" },
      dev: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: { $round: ["$max", 1]},
      menor_rating: { $round: ["$min", 1]},
      media_rating: { $round: ["$avg", 1]},
      desvio_padrao: { $round: ["$dev", 1]}
    }
  }
]);