db.trips.aggregate([
  {
    $match: {
      birthYear: { $exists: 1 },
      birthYear: { $ne: "" }
    }
  },

  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: { $toInt: "$birthYear" } },
      menorAnoNascimento: { $min: { $toInt: "$birthYear" } }
    }
  },
  {
    $project: {
      _id: 0
    }
  }
]);
