db.trips.aggregate([
    {$addFields:{
        nomeEstacao:{
            $dayOfWeek:"$startTime"
        }
    }},
    {$group:{
        _id:"$nomeEstacao",
        total:{$sum:1}
    }},
    {$sort:{
        total: -1
    }},
    {$limit : 1},
    {$project:{
        nomeEstacao:"$_id",
        _id: 0,
        total: 1
    }}
])