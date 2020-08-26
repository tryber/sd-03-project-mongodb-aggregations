db.movies.aggregate([
  {
    $match: {
      "languages": "English"
    }
  },
  {
  // destroi o array de entrada e gera um doc para
  // cada elemento do array.
    $unwind: "$cast"
  },
  {
    $group: {
      "_id": "$cast",
      "mediaIMDB": { $avg: "$imdb.rating" },
      "numeroFilmes": { $sum: 1 }
    }
  },
  {
    $project: {
      "_id": 1,
      "mediaIMDB": { $round: ["$mediaIMDB", 1] },
      "numeroFilmes": 1
    }
  },
  {
    $sort: {
      "numeroFilmes": -1,
      "_id": -1
    }
  }
]);
