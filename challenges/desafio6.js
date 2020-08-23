db.movies.aggregate([
    {
        $match: {
            "awards": {$regex: /Won  \d+ Oscar/i}
        }
    },
    {
        $group: {
            "_id": null,
            "maior_rating": {$max: "$imdb.rating"},
            "menor_rating": {$min: "$imdb.rating"},
            "gmedia_rating": {$avg: "$imdb.rating"},
            "gdesvio_padrao": {$stdDevSamp: "$imdb.rating"},
        }
    },
    {
        $project: {
            "_id":0,
            "maior_rating": 1,
            "menor_rating": 1,
            "media_rating": {$round: ["$gmedia_rating",1]},
            "desvio_padrao": {$round: ["$gdesvio_padrao",1]}
        }
    }
]);
