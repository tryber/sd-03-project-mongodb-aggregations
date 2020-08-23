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
            "media_rating": {$avg: "imdb.rating"},
            "desvio_padrao": {$stdDevSamp: "imdb.rating"},
            "_id":0
        }
    }
]);
