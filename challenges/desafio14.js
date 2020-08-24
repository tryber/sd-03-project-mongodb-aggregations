db.trips.aggregate([
    {
        $group: {
            "_id": "$bikeid",
            "duration": {$avg: 
                {$divide: [
                    {$subtract: ["$stopTime", "$startTime"]},
                    60000
                    ]
                }
            }
        }
    },
    {
        $project: {
            "_id": 0,
            "bikeId": "$_id",
            "duracaoMediaEmMinutos": {$ceil: "$duration"}
        }
    },
    {
        $sort: {
            "duracaoMediaEmMinutos": -1
        }
    },
    {
        $limit: 5
    }
]);
