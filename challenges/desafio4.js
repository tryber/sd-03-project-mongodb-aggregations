db.movies.aggregate([
    {
        $addFields: {
            "title_split": {$split: ["$title"," "]},
            "equaler": {$eq: [{$size: "$title_split"},1]}
        }
    },
    {
        $match: {
            "equaler": true
        }
    },
    {
        $project: {
            "title_split": 1,
            "_id": 0
        }
    },
    {
        $sort: {
            "title": 1
        }
    }
]);
