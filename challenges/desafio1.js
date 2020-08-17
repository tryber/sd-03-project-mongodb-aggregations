db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] },
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
 */

/* Esplicando o código.
 * seleciono todos os filmes da database "Aggregate".
 * faço uma comparação com o imdb rating se ele é maior ou igual a 7 (é preciso usar aspas duplas para acessar o que está dentro do sub objeto).
 * faço uma lista do que eu quero que não contenha certos generos.
 * escolho as classificações que eu quero que tenha, PG ou G.
 * por fim eu especifico que os filmes tem que ter em ingles e espanhol.
 */
