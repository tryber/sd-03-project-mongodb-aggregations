db.movies.aggregate([
  {$match: {"imdb.rating": {$gte: 7}}},
  {$match: {$nor: [{"genres": "Crime"}, {"genres": "Horror"}]}},
  {$match: {$or: [{"rated": "PG"}, {"rated": "G"}]}},
  {$match: {languages: {$all: ["English", "Spanish"]}}}
]).pretty();
