db.trips.aggregate([
  {$match: {"birthYear": {$exists: true}}},
  {$match: {"birthYear": {$ne: ""}}},
  {$project: {
    "anoNascimento": {$toInt: "$birthYear"}
  }},
  {$group: {
    "_id": null,
    "maiorAnoNascimento": {$max: "$anoNascimento"},
    "menorAnoNascimento" : {$min: "$anoNascimento"},
  }},
  {$project: {
    "_id": 0
  }}
]);
