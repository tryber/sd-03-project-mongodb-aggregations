db.movies.aggregate([
  {
    $match: { awards: /^Won.*Oscar/ }
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating1: { $avg: "$imdb.rating" },
      desvio_padrao1: { $stdDevSamp: "$imdb.rating" }
    }
  },
  {
    $project: { 
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: [ "$media_rating1", 1 ] },
      desvio_padrao: { $round: [ "$desvio_padrao1", 1 ] } 
    }
  }
]);
