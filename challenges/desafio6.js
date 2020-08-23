db.movies.aggregate([
    {
        $match: {
            "awards": {$regex: /Won  \d+ Oscar/i}
        }
    },
    {
        $group: {
            "_id": null,
            "maior_rating": {$sum: {$max: "$imdb.rating"}},
            "menor_rating": {$sum: {$min: "$imdb.rating"}},
            "media_rating": {$sum: {$avg: "$imdb.rating"}},
            "desvio_padrao": {$sum: {$stdDevSamp: "$imdb.rating"}},
        }
    },
    {
        $project: {
            "_id":0,
            "maior_rating": 1,
            "menor_rating": 1,
            "media_rating": {$round: ["$media_rating",1]},
            "dessvio_padrao": {$round: ["$desvio_padrao",1]}
        }
    }
]);
