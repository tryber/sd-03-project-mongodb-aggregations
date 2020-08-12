// Encontre a média de viagens por tipo de usuário. Exiba o valor em horas com apenas duas casas decimais e a média de viagens ordenada de forma crescente. Para arredondar a média use o $round.

// O resultado da sua query deve ter o seguinte formato:

// { "tipo" : <tipo>, "duracaoMedia" : <duracaoMedia> }

db.trips.aggregate([
{
  $addFields: {
    somaHoras: {
      $divide: [{
      $subtract: ["$stopTime", "$startTime"]}, 3600000]
      }
  }
},
{
  $group: {
    _id: "$usertype",
    "totHours": {$sum: "$somaHoras"},
    "totRides": {$sum: 1}
  }
},
{
  $project: {
    _id: 0,
    "tipo": "$_id",
    "duracaoMedia": {
      $round: [{
      $divide: ["$totHours","$totRides"]}, 2]
    }
  }
},
{
  $sort: {
    duracaoMedia: 1
  }
}
]);
