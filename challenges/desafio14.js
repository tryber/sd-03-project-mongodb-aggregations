db.trips.aggregate([
  {$addFields:{duration:{$divide:[{$subtract:["$stopTime","$startTime"]},60000]}}},
  {$group:{_id:"$bikeid",duration:{$avg:"$duration"}}}, 
  {$sort:{duration:-1}},
  {$project:{_id:0,bikeid:"$_id","duracaoMedia":{$ceil:"$duration"}}},
  {$limit:5}

])
