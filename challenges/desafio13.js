db.trips.aggregate([
  {$addFields:{date:{$dateToString:{date:"$startTime",format:"%d/%m/%Y"}},duration:{$divide:[{$subtract:["$stopTime","$startTime"]},60000]}}},    
  {$match:{date:"10/03/2016"}},
  {$group:{_id:null,"duracaoMediaEmMinutos":{$avg:"$duration"}}},
  {$project:{"duracaoMediaEmMinutos":{$ceil:"$duracaoMediaEmMinutos"}}}

])
