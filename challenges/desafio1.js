db.movies.aggregate([{
  $match: {
    "imdb.rating": { $gte: 7},
    "genres": {
      $nin: [
        "Crime",
        "Horror"
      ]
    },
    "languages": {
      $all: [
        "English",
        "Spanish"
      ]
    },
    $or: [
      { "rated": "PG" },
      { "rated": "G" }
    ]
  }
}]);
