db.trips.aggregate([
    {
        $addFields: { day: { $dayOfWeek: "$startTime" } },  // dias da semana / viagens
    },
    {
        $group: { // soma das viagens do dia da semana
            _id: "$day",
            total: { $sum: 1 },
        },
    },
    {
        $project: { // total de viagens do dia
            _id: 0,
            diaDaSemana: "$_id",
            total: "$total",
        },
    },
    { $sort: { total: -1 } }, // ordena para pegar o dia com mais viagem
    { $limit: 1 }, // pega o primeiro dia com mais viagem
]);
