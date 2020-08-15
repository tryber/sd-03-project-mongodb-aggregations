// Agora que você já sabe o dia com mais viagens, determine qual estação tem o maior número de viagens nesse dia da semana. Mas, para isso, adicione o que for necessário ao pipeline anterior. Exiba apenas o nome da estação e o total de viagens.

// { "nomeEstacao" : <nome_da_estacao>, "total" : <total_de_viagens> }

db.trips.aggregate([
  {
    $group: {
      _id: { $dayOfWeek: "$startTime" },
      total: { $sum: 1 }
    }
  },
  { $sort: { "total": -1} },
  { $limit: 1 },
  // Saída do desafio 11
  {
    $lookup: {
      from: "trips",
      let: { diaSemana: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$$diaSemana", { $dayOfWeek: "$startTime" }]
            }
          }
        },
        { 
          $group: {
            _id: "$startStationName",
            total: { $sum: 1 }
          }
        },
        { $sort: { total: -1 } },
        { $limit: 1 },
        { $project: { _id: 1, total: 1 } }
        ],
      as: "startStation"
    }
  },
  { $unwind: "$startStation" },
  // Para retornar o resultado fora da notação de elemento de [array]
  {
    $project: {
      _id: 0,
      nomeEstacao: "$startStation._id",
      total: "$startStation.total"
    }
  }
]);
