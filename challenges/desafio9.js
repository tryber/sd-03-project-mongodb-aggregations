db.trips.aggregate([
  { $match: { birthYear: { $exists: true, $ne: "" } } },
  {
    $group: {
      _id: null,
      max: { $max: { $toInt: "$birthYear" } },
      min: { $min: { $toInt: "$birthYear" } }
    }
  },
  {
    $project: { 
      _id: 0,
      maiorAnoNascimento: "$max",
      menorAnoNascimento: "$min"
    }
  }
]);
