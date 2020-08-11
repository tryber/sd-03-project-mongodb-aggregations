const splitTitle = {
  $split: ["$title", " "],
};
db.movies.aggregate([
  {
    $match: {
      $expr: {
        $eq: [{ $size: splitTitle }, 1],
      },
    },
  },
  { $project: { title_split: splitTitle, _id: 0 } },
  { $sort: { title_split: 1 } },
]);
