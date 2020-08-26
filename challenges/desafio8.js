db.air_alliances.aggregate([
    { $unwind: "$airlines" }, // não irá produzir documento caso o valor for nulo
    {
        $lookup: {
            from: "air_routes", let: { airlines: "$airlines" },
            pipeline: [ // Liste todas as parcerias da coleção air_alliances, que voam rotas com um Boing 747 ou um Airbus A380
                { $match: { airplane: { $in: ["747", "380"] } },
                            $expr: { $eq: ["$airline.name", "$$airlines"] } }

            ], as: "parceiras"
        }
    },
    {
        $unwid: "$parceiras"
    }, // descubra qual delas tem o maior número de rotas com esses aviões.
    { $group: { _id: "$name", "totalRotas": { $sum: 1 } } },
    { $sort: { totalRotas: -1 } },
    { $limit: 1 } // mostra que tem mais rotas com esses aviões.
]);
