db.movies.aggregate(
    [
        {
            $addFields: {
                num_favs: { // linha 5 a 21 || represente quantos atores ou atrizes da nossa lista de favoritos aparecem no elenco (campo cast) do filme.
                    $cond: {
                        if: { $isArray: "$cast" },
                        then: {
                            $size: {
                                $setIntersection: [
                                    [
                                        "Sandra Bullock",
                                        "Tom Hanks",
                                        "Julia Roberts",
                                        "Kevin Spacey",
                                        "George Clooney",
                                    ], "$cast"]
                            },
                        },
                        else: 0,
                    }
                },
            },
        },
        {
            $match: {  // Para filmes lançados nos Estados Unidos (campo countries), com tomatoes.viewer.rating maior ou igual a 3
                "countries": "USA",
                "tomatoes.viewer.rating": {
                    $gte: 3,
                },
            },
        },
        {
            $sort: { // num_favs, tomatoes.viewer.rating e title, todos em ordem decrescente.
                "num_favs": -1,
                "tomatoes.viewer.rating": -1,
                "title": -1,
            },
        },
        {
            $project: {
                "_id": 0,
                "title": 1,
            },
        },
        {
            $limit: 25, // limita 25 || Qual o título do vigésimo quinto filme do resultado dessa agregação?
        },
        {
            $skip: 24, // pula 24 para pegar o 25.
        },
    ]
);
