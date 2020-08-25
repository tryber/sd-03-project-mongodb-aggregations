db.movies.aggregate([
  {
    $match:
    {
      $expr: {
        $eq: [1, {
          $size: {
            $split: ["$title", " "]
          }
        }]
      }
    }
  },
  {
    $project:
    {
      "_id": 0,
      "title_split": ["$title"],
    }
  },
  {
    $sort:
    {
      "title_split": 1
    }
  },
  // { $count: "title_split" }
]);
