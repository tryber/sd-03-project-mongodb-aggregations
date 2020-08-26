db.trips.aggregate([
    {
        $group: {
            _id: "$bikeid",
            tempo: { 
                $avg: {
                    $subtract: ["$stopTime", "$startTime"] // tempo inicio - tempo fim
                }
            }
        }
    },
    {
        $sort: { // faz a ordenação em ordem decrescente
            tempo: -1
        }
    },
    {
        $limit: 5 // limita 5 documentos
    },
    {
        $project: {
            _id: 0,
            bikeId: "$_id",
            duracaoMedia: {
                $ceil: { // arredonda pra cima caso tenha numero quebrado
                    $divide: ["$tempo", 60000] // tempo - 60000
                }
            }
        }
    }]
);
