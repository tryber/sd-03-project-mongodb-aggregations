db.movies.aggregate([
    {
        $match: {
            "awards": {$regex: /Oscar/i}
        }
    },
    {
        $project: {
            "maior_rating": {$max: "$imdb.rating"},
            "menor_rating": {$min: "imdb.rating"},
            "media_rating": {$round: [{$avg: "imdb.rating"},1]},
            "desvio_padrao": {$round: [{$stdDevSamp: "imdb.rating"},1]},
            "_id":0
        }
    }
]);
