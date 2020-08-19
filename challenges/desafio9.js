db.trips.aggregate([
  {$match:{birthYear:{$exists:true},birthYear:{$not:{$eq:""}}}},
  {$group:{_id:0,"maiorAnoNascimento":{$max:{$toInt:"$birthYear"}},"menorAnoNascimento":{$min:{$toInt:"$birthYear"}}}},
  {$project:{_id:0}}
  
])
