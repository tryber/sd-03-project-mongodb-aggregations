db.movies.aggregate([
  {$match: 
    {"languages": {$all: ["English"]}}
  },
  {$unwind: "$cast"},
  {$group: {
      "_id": "$cast",
      "countFilmes": {$sum: 1},
      "avgIMDB": {$avg: "$imdb.rating" }
    }},
  {$project: {
      "numeroFilmes": "$countFilmes",
      "mediaIMDB": {$round: ["$avgIMDB", 1]}
    }},
  {$sort: {
      "numeroFilmes": -1,
      "_id": -1
    }}
]);
