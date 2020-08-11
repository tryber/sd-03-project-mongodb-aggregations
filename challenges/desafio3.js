db.movies.aggregate([
  {
    $match: {
      $and: [
        {
          "imdb.rating": {
            $gte: 7,
          },
        },
        {
          genres: {
            $nin: ["Crime", "Horror"],
          },
        },
        {
          rated: {
            $in: ["PG", "G"],
          },
        },
        {
          languages: {
            $all: ["English", "Spanish"],
          },
        },
      ],
    },
  },
  {
    $project: {
      _id: 0,
      titulo: "$title",
      avaliado: "$rated",
      notaIMBD: "$imdb.rating",
      votosIMBD: "$imdb.votes",
      ano: "$year",
    },
  },
  {
    $sort: {
      ano: -1,
      notaIMBD: -1,
      titulo: 1,
    },
  },
]);
