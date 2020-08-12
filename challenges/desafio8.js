db.air_alliances.aggregate([ { $unwind: "$airlines" }, { $lookup: { from: "air_routes", let: { "airlinesData": "$airlines" }, pipeline: [{ $match: { $and: [{ $expr: { $eq: ["$airline.name", "$$airlinesData"] } },{ "airplane": { $in: ["747", "380"] }  }] } }, { $group: { _id: "$airline.name", "total": { $sum: 1 } } }, { $project:  {"_id": 1, total: 1} }], as: "airplaneData" } }, {$unwind: "$airplaneData"}, {$project: {_id: "$airplaneData._id", totalRotas: "$airplaneData.total"}}]);
