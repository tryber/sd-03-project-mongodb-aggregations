db.trips.aggregate([
  { $addFields: {
    tempoTotal: { $abs: {
      $subtract: ["$startTime", "$stopTime"]
    } }
  } },
  { $group: {
    _id: "$usertype",
    duracaoMedia: { $avg: "$tempoTotal" }
  } },
  { $project: {
    _id: 1,
    tipo: "$_id",
    duracaoMedia: { $round: [{
      $divide: [
        { $avg: "$duracaoMedia" }
        , 3600000]
      }, 2] }
  } }
]);
