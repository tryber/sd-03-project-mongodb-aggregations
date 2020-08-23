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
            "mediaIMDB": {$round: [{$sum: {$avg: "$imdb.rating"}},1]}
        }
    },
    {
        $project: {
            "numeroFilmes": 1,
            "mediaIMDB": 1
        }
    }
]);
