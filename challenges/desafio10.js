db.trips.aggregate([
  {$match:{birthYear:{$exists:true},birthYear:{$not:{$eq:""}}}},
  {$group:{_id:1,"maiorAnoNascimento":{$max:{$toInt:"$birthYear"}},"menorAnoNascimento":{$min:{$toInt:"$birthYear"}}}}
  
])
