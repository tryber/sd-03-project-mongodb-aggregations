db.movies.aggregate([
    {
        $match:  // Considere somente os membros do elenco de filmes com o idioma inglês (English).
            { "languages": "English" }
    },
    { $unwind: "$cast" }, // não vai produzir um documento se o valor for nulo
    {
        $group: {  // Queremos contar quantos filmes cada um dos atores e atrizes do elenco (cast) já participou e pega uma media com avg.
            "_id": "$cast",
            "contarFilmes": { $sum: 1 },
            "avgIMDB": { $avg: "$imdb.rating" }
        }
    },
    {
        $project: {  // traga o nome do ator ou atriz, número de filmes em que participou e a média do imdb desses filmes arredondada para uma casa decimal usando o operador $round
            "mediaIMDB": { $round: ["$avgIMDB", 1] },
            "filmes": 1
        }
    },
    {
        $sort: {  // Exiba a lista em ordem decrescente de documentos pelo número de filmes e nome do ator ou atriz.
            "filmes": -1,
            "_id": -1
        }
    }
]);
