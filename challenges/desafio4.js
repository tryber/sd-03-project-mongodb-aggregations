db.movies.aggregate([
  {$addFields: {"title_split": {$split: ["$title", " "]}}},
  {$addFields: {"tamanho": { $size: "$title_split"}}},
  {$match: {"tamanho": {$eq: 1}}},
  {$sort: {"title": 1}},
  {$project: {"_id": 0,"title_split": 1}}
]);
