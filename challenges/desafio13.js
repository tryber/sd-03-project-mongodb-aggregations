db.trips.aggregate(
  [
    {
      $addFields: {
        day: {
          $dayOfMonth: "$startTime",
        },
        month: {
          $month: "$startTime",
        },
        year: {
          $year: "$startTime",
        },
      },
    },
    {
      $match: {
        "day": 10,
        "month": 3,
        "year": 2016,
      },
    },   
    {
      $group: {
        _id: null,
        duracaoMedia: {
          $avg: {
            $subtract: [ "$stopTime", "$startTime" ],
          }, 
        },
      },
    },
    {
      $project: {
        "_id": 0,
        "duracaoMediaEmMinutos": {
          $ceil: {
            $divide: [ "$duracaoMedia", 1000*60 ],
          },
        },
      },
    },
  ]
);
