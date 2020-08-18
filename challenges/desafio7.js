db.movies.aggregate([
  {
    $match: {
      languages: { $in: [ "English" ] }
    }
  },
  {
    $unwind: "$cast"
  },
  { 
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      mediaIMDB: { $round: [ { $avg: "$imdb.rating" }, 1 ] }
    }
  }, 
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1
    }
  }
]);
