db.movies.aggregate([
    {
        $match: {
            "countries": "USA",
            "tomatoes.viewer.ratings": {$gte: 3},
            "cast": {$exists: true}
        }
    },
    {
        $addFields: {
            "favs": {$setIntersection: ["$cast",
                ["Sandra Bullock",
                "Tom Hanks",
                "Julia Roberts",
                "Kevin Spacey",
                "George Clooney"]]}
        }
    },
    {
        $addFields: {
            "num_favs": {$size: "$favs"}
        }
    },
    {
        $sort: {
            "num_favs": -1,
            "tomatoes.viewer.rating": -1,
            "title": -1
        }
    },
    {
        $project: {
            "title": 1,
            "_id": 0
        }
    },
    {
        $skip: 24
    },
    {
        $limit: 1
    }
]);
