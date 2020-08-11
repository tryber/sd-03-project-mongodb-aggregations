db.movies.aggregate([
  { $project: {
    _id: 0,
    title_split: { $split: "$title" }
  } },
  { $match: {
    title_split: [{ $size: 1 }, " "]
  } },
  { $unwind: title_split },
  { $sort: { title_split: 1} },
]);
