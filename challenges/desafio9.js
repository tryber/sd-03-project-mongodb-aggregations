db.trips.aggregate([
  {
    $match: {
      birthYear: {$nin: [""]}
  }
},
{
  $group:{
    _id: 0,
    maiorAnoNascimento:{ $max: {$toInt:"$birthYear"}},
    menorAnoNascimento: { $min: "$birthYear"},
  }
},
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: 1,
      menorAnoNascimento: 1,
    }
  }
]);
