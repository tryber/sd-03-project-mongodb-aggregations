db.movies.aggregate([
    {
        $match: {
            "countries": "USA",
            "tomatoes.viewer.ratings": {$gte: 3}
        }
    },
    {
        $addFields: {
            "favs": {$setIntersection: [["Sandra Bullock","Tom Hanks","Julia Roberts","Kevin Spacey","George Clooney"],"$cast"]}
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
        $projection: {
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
