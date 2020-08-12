// A partir da cole��o trips, determine o menor e o maior ano de nascimento. Guarde essa informa��o, voc� precisar� dela mais tarde.

// N�o considere documentos com valores vazios ("") ou em que o campo n�o existe!

// Para este desafio utilize o operador $toInt para converter de string para valor inteiro.

// O resultado da sua query deve ter o seguinte formato:

// { "maiorAnoNascimento" : <ano>, "menorAnoNascimento" : <ano> }

db.trips.aggregate([
{ $match: { birthYear: { $gte: 100 } } },
{
  $group: {
    _id: 0,
    maiorAnoNascimento: { $max: "$birthYear"},
    menorAnoNascimento: { $min: "$birthYear"}
  }
},
{ $project: { _id: 0 } }
]);
