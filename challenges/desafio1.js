// commit inicial
db.movies.aggregate([
  {$match: {"imdb.rating": {$gte: 7}}},
  {$match: {$nor: [{"genres": "Crime"}, {"genres": "Horror"}]}},
  {$match: {$or: [{"rated": "PG"}, {"rated": "G"}]}},
  {$match: {$and: [{"languages": "English"}, {"languages": "Spanish"}]}}
]).pretty();
