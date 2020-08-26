db.trips.aggregate([
    {
        $addFields: { day: { $dayOfWeek: "$startTime" } },  // dias da semana / viagens
    },
    {
        match: {
            diaDaSemana: 5,
        }
    },
    {
        $group: { // soma das viagens do dia da semana
            _id: "$day",
            total: { $sum: 1 },
        },
    },
    {
        $project: { // Agora que você já sabe o dia com mais viagens, determine qual estação tem o maior número de viagens nesse dia da semana
            "_id": 0,
            "nomeEstacao": "$_id.nomeEstacao",
            "total": "$total"
        }
    },
    { $sort: { total: -1 } }, // ordena para pegar o dia com mais viagem
    { $limit: 1 }, // pega o primeiro dia com mais viagem
]);
