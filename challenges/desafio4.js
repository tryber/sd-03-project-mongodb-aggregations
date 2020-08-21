db.movies.aggregate([
    {
        $match: {
            "title": {$split: ["$title"," "]}
        }
    },
    {
        $project: {
            "title_split": {$split: ["$title"," "]},
            "_id": 0
        }
    },
    {
        $sort: {
            "title": 1
        }
    }
]);
