// Agora que voc� j� sabe o dia com mais viagens, determine qual esta��o tem o maior n�mero de viagens nesse dia da semana. Mas, para isso, adicione o que for necess�rio ao pipeline anterior. Exiba apenas o nome da esta��o e o total de viagens.

// { "nomeEstacao" : <nome_da_estacao>, "total" : <total_de_viagens> }

db.trips.aggregate([
  {
    $group: {
      _id: "$startStationName",
      total: { $sum: 1}
    }
  },
  {
    $project: {
      _id: 0,
      "nomeEstacao": "$_id",
      total: 1
    }
  },
  { $sort: { total: -1} }
  ]);
  