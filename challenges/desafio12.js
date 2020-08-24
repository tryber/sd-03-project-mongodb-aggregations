db.trips.aggregate([
    {
        $group: {
            "_id": { 
                "dia": {$dayOfWeek: "$startTime"},
                "estacao": "$startStationName"
                },
            "total": {$sum: 1}
        }
    },
    {
        $project: {
            "nomeEstacao": "$_id.estacao",
            "total": "$total",
            "_id": 0
        }
    },
    {
        $sort: {
            "total": -1
        }
    },
    {
        $limit: 1
    }
]);
