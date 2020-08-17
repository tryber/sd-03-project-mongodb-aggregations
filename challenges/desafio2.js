db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] },
    },
  },
  {
    $project: {
      _id: 0,
      titulo: "$title",
      avaliado: "$rated",
      notaIMDB: "$imdb.rating",
      votosIMDB: "$imdb.votes",
      ano: "$year",
    },
  },
]);

// Formatado com: Prettier

/* Referencias.
 * https://docs.mongodb.com/manual/reference/operator/aggregation/match/
 * https://docs.mongodb.com/manual/reference/operator/aggregation/gte/
 * https://docs.mongodb.com/manual/reference/operator/query/nin/
 * https://docs.mongodb.com/manual/reference/operator/query/in/
 * https://docs.mongodb.com/manual/reference/operator/query/all/
 * https://docs.mongodb.com/manual/reference/operator/aggregation/project/
 */

/* Esplicando o código.
 * seleciono todos os filmes da database "Aggregate".
 * faço uma comparação com o imdb rating se ele é maior ou igual a 7 (é preciso usar aspas duplas para acessar o que está dentro do sub objeto).
 * faço uma lista do que eu quero que não contenha certos generos.
 * escolho as classificações que eu quero que tenha, PG ou G.
 * por fim eu especifico que os filmes tem que ter em ingles e espanhol.
 * 
 * ao usar o project, eu faço uma especie de nomeação com filtro para as "colunas" que eu gostaria de apelidar e exibir. (como se fosse o AS do mySQL).
 * apos isso eu apenas nomeio e indico as paginas que eu gostaria de ver.
 */
