db.trips.aggregate([
  {$addFields:{date:{$dateToString:{date:"$startTime",format:"%d/%m/%Y"}},duration:{$divide:[{$subtract:["$stopTime","$startTime"]},60000]}}},    
  {$sort:{duration:-1}},
  {$project:{_id:0,bikeid:1,"duracaoMedia":{$ceil:"$duration"}}},
  {$limit:5}

],{allowDiskUse: true})
