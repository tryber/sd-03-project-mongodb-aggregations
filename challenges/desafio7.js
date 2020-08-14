db.movies.aggregate([
  {
    $match: {
      languages: "English",
      languages:{$exists: 1}
    },
  },
  { $unwind: "$cast" },
  {
    $project: {
      _id: "$cast",
      "imdb.rating": 1,
    },
  },
  {
    $group: {
      _id: "$_id",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 1,
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$mediaIMDB", 1] },
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: 1,
    },
  },
]);
