db.movies.aggregate(
  [
    {
      $addFields: {
        num_favs: {
          $cond: {
            if: { $isArray: "$cast"},
            then: {
              $size: {
                $setIntersection: [
                  [
                    "Sandra Bullock",
                    "Tom Hanks",
                    "Julia Roberts",
                    "Kevin Spacey",
                    "George Clooney",
                ], "$cast" ]
              },
            },
            else: 0,
          }
        },
      },
    },
    {
      $match: {
        "countries": "USA",
        "tomatoes.viewer.rating": {
          $gte: 3,
        },
      },
    },
    {
      $sort: {
        "num_favs": -1,
        "tomatoes.viewer.rating": -1,
        "title": -1,
      },
    },
    {
      $project: {
        "_id": 0,
        "title": 1,
      },
    },
    {
      $limit: 25,
    },
    {
      $skip: 24,
    },
  ]
);
