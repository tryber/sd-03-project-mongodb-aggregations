db.trips.aggregate([
  { $match: { $and: [{ birthYear: { $exists: true } }, { birthYear: { $not: { $eq: "" } } }] } },
  { $group: { _id: null, minBday: { $min: { $toInt: "$birthYear" } }, maxBday: { $max: { $toInt: "$birthYear" } } } },
  { $project: {_id: 0, maiorAnoNascimento: "$maxBday", menorAnoNascimento: "$minBday" } }
]);
