db.trips.aggregate([
    {
        $addFields: {
            sexta: { $dayOfWeek: "$startTime" } // dias da semana / viagens
        }
    },
    { $match: { sexta: { $eq: 5 } } },
    {
        $group: { // soma das viagens do dia da semana
            "_id": "$startStationName",
            "total": { $sum: 1 }
        }
    },
    {
        $project: { // Agora que você já sabe o dia com mais viagens, determine qual estação tem o maior número de viagens nesse dia da semana
            "_id": 0,
            "nomeEstacao": "$_id",
            "total": "$total",

        }
    },
    { $sort: { "total": -1 } }, // ordena para pegar o dia com mais viagem
    { $limit: 1 } // pega o primeiro dia com mais viagem
]);
