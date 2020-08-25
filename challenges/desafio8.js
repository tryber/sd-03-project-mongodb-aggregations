db.air_alliances.aggregate([
    { $unwind: "$airlines" }, // não irá produzir documento caso o valor for nulo
    {
        $lookup: {
            from: "air_routes", let: { airlines: "$airlines" },
            pipeline: [ // Liste todas as parcerias da coleção air_alliances, que voam rotas com um Boing 747 ou um Airbus A380
                { $match: { $expr: { $eq: ["$airline.name", "$$airlines"] } } },
                { $match: { airplane: { $in: ["747", "380"] } } }

            ], as: "parceiras"
        }
    },
    {
        $addFields:
            { count: { $size: "$filed" } }
    }, // descubra qual delas tem o maior número de rotas com esses aviões.
    { $group: { _id: "$name", "totalRotas": { $sum: "$count" } } },
    { $sort: { totalRotas: -1 } },
    { $limit: 1 } // mostra que tem mais rotas com esses aviões.

]);