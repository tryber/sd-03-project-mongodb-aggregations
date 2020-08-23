db.movies.aggregate([
    {
        $match: {
            "languages": {$all: ["English"]}
        }
    },
    {
        $addFields: {"favs": ["Sandra Bullock",
                "Tom Hanks",
                "Julia Roberts",
                "Kevin Spacey",
                "George Clooney"]
    }},
    {
        $unwind: "$cast"
    },
    {
        $unwind: "$favs"
    },
    {
        $group: {
            "_id": "$favs",
            "numeroFilmes": {$sum: {$eq: ["$_id","$cast"]}},
            "mediaIMDB": {$sum: {$avg: "$imdb.rating"}}
        }
    }
]);
