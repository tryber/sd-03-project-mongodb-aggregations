db.air_alliances.aggregate([
  {$unwind:"$airlines"},
  {$lookup:{from:"air_routes",let:{airlines:"$airlines"},
            pipeline:[
  {$match:{$expr:{$eq:["$airline.name","$$airlines"]}}},
  {$match:{airplane:{$in:["747","380"]}}}

],as: "filed"}},{$addFields:{count:{$size:"$filed"}}},{$group:{_id:"$name","totalRotas":{$sum:"$count"}}},{$sort:{totalRotas:-1}},{$limit:1}    

])
