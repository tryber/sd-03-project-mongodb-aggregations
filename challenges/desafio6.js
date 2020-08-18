/*
  Regex, recebi ajuda do hebert e do so
  https://stackoverflow.com/questions/14017134/what-is-d-d-in-regex
*/
db.movies.aggregate([
  {$match: {"awards": {$regex: /won \d+ oscars?/i}}},
  {$group: {
    "_id": null,
    "maior_rating": {$max: "$imdb.rating"},
    "menor_rating": {$min: "$imdb.rating"},
    "media": {$avg: "$imdb.rating"},
    "maior": {$stdDevSamp: "$imdb.rating"},
  }},
  {$project:{
    "_id": 0,
    "maior_rating": 1,
    "menor_rating": 1,
    "media_rating" : {$round: ["$media", 1]},
    "desvio_padrao" :{$round: ["$maior", 1]} 
  }}
]);
