db.air_alliances.aggregate([
    { $unwind: "$airlines" }, // não irá produzir documento caso o valor for nulo
    {
        $lookup: {
            from: "air_routes",
            let: { airlines: "$airlines" },
            pipeline: [
                {
                    $match:
                    {
                        $and: [{
                            $expr:
                                { $eq: ["$airline.name", "$$airnlines"] }
                        },
                        { airplane: { $in: ["747", "380"] } }
                        ]
                    }
                }
            ], as: "parceiras"
        }
    },
    {
        $unwid: "$parceiras"
    }, // descubra qual delas tem o maior número de rotas com esses aviões.
    { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
    { $sort: { totalRotas: -1 } },
    { $limit: 1 } // mostra que tem mais rotas com esses aviões.
]);

// referencia: https://github.com/tryber/sd-03-project-mongodb-aggregations/blob/tales/challenges/desafio8.js (linha 7 a 18)
