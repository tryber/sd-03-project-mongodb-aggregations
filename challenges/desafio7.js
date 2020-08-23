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
            "gnumeroFilmes": {$sum: 1},
            "gmediaIMDB": {$avg: "$imdb.rating"}
        }
    },
    {
        $project: {
            "numeroFilmes": "$gnumeroFilmes",
            "mediaIMDB": {$round: ["$gmediaIMDB",1]}
        }
    }
]);
