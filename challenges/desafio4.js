db.movies.aggregate([
  {
    $project: {
      _id: 0,
      title_split: { $split: ["$title", " "] },
    },
  },
  {
    $match: {
      title_split: { $size: 1 },
    },
  },
  {
    $sort: {
      title_split: 1,
    },
  },
]);

// Formatado com: Prettier

/* referencias
 * https://docs.mongodb.com/manual/reference/operator/aggregation/project/
 * https://docs.mongodb.com/manual/reference/operator/aggregation/split/
 * https://docs.mongodb.com/manual/reference/operator/query/size/
 * https://docs.mongodb.com/manual/reference/operator/aggregation/match/
 * https://docs.mongodb.com/manual/reference/operator/aggregation/sort/
 */

/* Esplicando o codigo.
 * com o project eu faço um tipo de AS do mysql passando apenas a "coluna" que quero ver com o novo apelido dela.
 * faço uma divisão na string com o sprit, bem parecido com o do javascript.
 * faço um filtro com match para passar apenas condições especificas.
 * uso o size para buscar os filmes que tenha apenas uma palavra.
 * uso o sort com o numero 1 para fazer buscas ascendentes.
 */
