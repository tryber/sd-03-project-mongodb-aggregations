db.movies.aggregate([
    {
        $match: {
            "languages": {$all: ["English"]}
        }
    },
    {
        $unwind: "$cast"
    },
    {
        $group: {
            "_id": "$cast",
            "numeroFilmes": {$sum: 1},
            "gmediaIMDB": {$avg: "$imdb.rating"}
        }
    },
    {
        $project: {
            "numeroFilmes": 1,
            "mediaIMDB": {$round: ["$gmediaIMDB",1]}
        }
    }
]);
