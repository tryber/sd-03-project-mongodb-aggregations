db.movies.aggregate([
  {
    $match: {
      "awards": {
        $regex: /Won \d+ Oscars?/i
      },
    }
  },
  { $unwind: "$imdb" },
  {
    $group: {
      "_id": null,
      "maior_rating": { $max: "$imdb.rating" },
      "menor_rating": { $min: "$imdb.rating" },
      "media_rating": { $avg: "$imdb.rating" },
      "desvio_padrao": { $stdDevSamp: "$imdb.rating" }
    }
  },
  {
    $addFields: {
      "media_rating": { $round: [ "$media_rating", 1 ] },
      "desvio_padrao": { $round: [ "$desvio_padrao", 1 ] }
    }
  },
  {
    $project: {
      "_id": 0
    }
  }
])
