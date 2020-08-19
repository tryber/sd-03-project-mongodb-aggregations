db.trips.aggregate([
  {$group:{_id:null,"maiorAnoNascimento":{$max:"$birthYear"},"menorAnoNascimento":{$min:"$birthYear"}}}

])
