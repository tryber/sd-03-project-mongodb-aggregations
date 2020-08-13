// Determine a duração média das viagens iniciadas no dia 10/03/2016, em minutos. Arredonde o resultado para cima.

// O resultado da sua query deve ter o seguinte formato:
// { "duracaoMediaEmMinutos" : <duracao_media_em_minutos> }

db.trips.aggregate([
{
  $match: {
    startTime: { $gte: ISODate("2016-03-10"), $lte: ISODate("2016-03-11") }
  }
},
{
  $addFields: {
    rideDuration: { $divide: [{ $subtract: ["$stopTime", "$startTime"]}, 60000] }
  }
},
{
  $group: {
    _id: null,
    avgRideDuration: { $avg: "$rideDuration" },
  }
},
{
  $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $ceil: "$avgRideDuration" }
  }
}
]);
