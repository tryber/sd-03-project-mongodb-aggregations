db.trips.aggregate([
    {
        $project:
        {
            date:
            {
                $dateToParts:
                    { date: "$startTime" }
            }, // quando começou e terminou uma viagem
            startTime: 1, stopTime: 1
        }
    },
    {
        $match: // Determine a duração média das viagens iniciadas no dia 10/03/2016
            { "date.year": 2016, "date.month": 3, "date.day": 10, }
    },
    {
        $group:
        {
            _id: null, duracaoMediaEmMinutos:
            {
                $avg:
                {
                    $divide: [ // divide por outro (o valor dado ao ser concretizado o subtract e 60000)
                        { $subtract: ["$stopTime", "$startTime"] }, 60000 // pega a hora de fim menos a hora de inicio e retorna a quantidade de horas.
                    ]
                }
            }
        }
    },
    {
        $project:
        {// em minuto
            _id: 0, duracaoMediaEmMinutos:
                { $ceil: "$duracaoMediaEmMinutos" }
        }
    }
]);
