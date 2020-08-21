db.movies.aggregate([
  { $match: { languages: "English" } },
  { $unwind: "$cast" },
  {
    $group: {
      _id: "$cast",
      moviesCount: { $sum: 1 },
      imdbRatingAvg: { $avg: "$imdb.rating" }
    }
  },
  {
    $project: {
      numeroFilmes: "$moviesCount",
      mediaIMDB: { $round: ["$imdbRatingAvg", 1] }
    }
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1
    }
  }
]);
