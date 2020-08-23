db.movies.aggregate([
    {
        $match: {
            "awards": {$regex: /Won  \d+ Oscar/i}
        }
    },
    {
        $group: {
            "_id": null,
            "gmaior_rating": {$max: "$imdb.rating"},
            "gmenor_rating": {$min: "$imdb.rating"},
            "gmedia_rating": {$avg: "$imdb.rating"},
            "gdesvio_padrao": {$stdDevSamp: "$imdb.rating"},
        }
    },
    {
        $project: {
            "_id":0,
            "maior_rating": "$gmaior_rating",
            "menor_rating": "$gmenor_rating",
            "media_rating": {$round: ["$gmedia_rating",1]},
            "desvio_padrao": {$round: ["$gdesvio_padrao",1]}
        }
    }
]);
