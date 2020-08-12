// Trocando de contexto, vamos utilizar nosso outro dataset que cont�m dados de empresas a�reas, suas rotas, seus voos e parcerias.

// Liste todas as parcerias da cole��o air_alliances, que voam rotas com um Boing 747 ou um Airbus A380 (que est�o abreviados para 747 e 380 no campo airplane na cole��o air_routes, respectivamente), e descubra qual delas tem o maior n�mero de rotas com esses avi�es.

// O resultado da sua query deve ter o seguinte formato:
// {"_id" : <nome_da_alianca>, "totalRotas" : <total_de_rotas>}

db.air_routes.aggregate([
{
  $match: {
  airplane: { $in: ["380", "747"]}
  }
},
{
  $lookup: {
  from: "air_alliances",
  localField: "airline.name",
  foreignField: "airlines",
  as: "alliances"
  }
},
{
  $unwind: { path: "$alliances" }
},
{
  $group: {
  _id: "$alliances.name",
  totalRotas: { $sum: 1 }
  }
},
{ $sort: { totalRotas: -1 } },
{ $limit: 1}
]);
