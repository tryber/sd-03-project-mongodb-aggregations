// Desafio 14
// Baseado na duração média das viagens, determine quais são as 5 bicicletas que foram mais utilizadas. Exiba o resultado em minutos arredondados para cima e em ordem decrescente.
// O resultado da sua query deve ter o seguinte formato:
// { "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
// { "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
// { "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
// { "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
// { "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
db.trips.aggregate([
  { $project: {
    _id: 0,
    bikeid: 1,
    duracaoEmMinutos: {
      $divide: [ { $subtract: [ "$stopTime", "$startTime" ] }, 1000*60 ]
    }
  }},
  { $group: {
    _id: "$bikeid",
    duracaoMedia: { $avg: "$duracaoEmMinutos" }
  }},
  { $project: {
    _id: 0,
    bikeId: "$_id",
    duracaoMedia: { $ceil: "$duracaoMedia" }
  }},
  { $sort: { duracaoMedia: -1 }},
  { $limit: 5 }
]);
