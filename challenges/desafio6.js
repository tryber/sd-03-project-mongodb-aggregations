db.movies.aggregate([
  { $match: { awards: { $regex: /Won \d+ Oscars?/i } } },
  { $unwind: "$imdb" },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating: { $avg: "$imdb.rating" },
      desvio_padrao: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $addFields: {
      media_rating: { $round: ["$media_rating", 1] },
      desvio_padrao: { $round: ["$desvio_padrao", 1] },
    },
  },
  { $project: { _id: 0 } },
]);

// Formatado com: Prettier

/* Referencias.
 * https://docs.mongodb.com/manual/reference/operator/aggregation/match/
 * https://docs.mongodb.com/manual/reference/operator/query/regex/
 * https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions
 * https://docs.mongodb.com/manual/reference/operator/aggregation/group/
 * https://docs.mongodb.com/manual/reference/operator/aggregation/max/
 * https://docs.mongodb.com/manual/reference/operator/aggregation/min/
 * https://docs.mongodb.com/manual/reference/operator/aggregation/avg/
 * https://docs.mongodb.com/manual/reference/operator/aggregation/stdDevSamp/
 * https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/
 * https://docs.mongodb.com/manual/reference/operator/aggregation/round/
 */

/* Explicação 
    Faço o uso do match para fazer um filtro com minhas especificações,
    depois faço uma busca nos premios para ver quem já ganhou o oscar com o regex para poder fazer uma busca com expressão regular.
    utilizo o group para fazer gerar os valores maior menor media e desvio.
    adiciono um novo campo para de media e devio com os valores arredondados com 1 casa decimal.
  */
