
db.trips.aggregate([
    {
        $addFields:
            { "tempoViagem": { $subtract: ["$stopTime", "$startTime"] } } // hora inicio/fim subtraindo para pegar quantidade de horas
    },
    {
        $group: // Encontre a média de viagens por tipo de usuário
            { "_id": "$usertype", "duracaoMedia": { $avg: "$tempoViagem" } }
    },
    {
        $project: { // Exiba o valor em horas com apenas duas casas decimais
            "_id": 0,
            "tipo": "$_id",
            "duracaoMedia": {
                $round: [{ $divide: ["$duracaoMedia", 3600000] }, 2] // Para arredondar a média use o $round
            }
        }
    },
    { $sort: { "duracaoMedia": 1 } } // ordenada de forma crescente
]);
