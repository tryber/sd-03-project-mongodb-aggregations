db.air_alliances.aggregate([
    {
        $unwind: "$airlines"
    },
    {
        $lookup: {
            from: "air_routes",
            localField: "airlines",
            foreignField: "airline.name",
            as: "rota"
        }
    },
    {
        $unwind: "$rota"
    },
    {
        $match: {
            "rota.airplane": {$in: ["747","380"]}
        }
    },
    {
        $group: {
            "_id": "$name",
            "totalRotas": {$sum: 1}
        }
    },
    {
        $sort: {
            "totalRotas": -1
        }
    },
    {
        $limit: 1
    }
]);
