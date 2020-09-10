// Vamos explorar mais operadores aritméticos!

// Considerando todos os filmes que ganharam o Oscar pelo menos uma vez, calcule o **maior valor**, **menor valor**, **média** e o **desvio padrão** das avaliações (campo `imdb.rating`). Para a média e o desvio padrão arredonde os valores para uma casa decimal utilizando o [`$round`](https://docs.mongodb.com/manual/reference/operator/aggregation/round/index.html).

// Dica: todos os filmes na coleção, que já ganharam um Oscar, começam com uma sequência de string parecida com essas abaixo, portanto `$regex` é um operador bem-vindo:

// ```
// Won 10 Oscars
// Won 1 Oscar
// ```

// Utilizem o [`$stdDevSamp`](https://docs.mongodb.com/manual/reference/operator/aggregation/stdDevSamp/index.html) para calcular o desvio padrão.

// O resultado da sua query deve ter o seguinte formato:

// ```javascript
// {
//   "maior_rating" : <maior_rating>,
//   "menor_rating" : <menor_rating>,
//   "media_rating" : <media_rating>,
//   "desvio_padrao" : <desvio_padrao>
// }

db.movies.aggregate([
  {
    $match: { $and: [
      { countries: "USA" },
      { "tomatoes.viewer.rating": { $gte: 3 } },
      { cast: { $exists: 1} }
    ]}
  },
  {
    $addFields: {
      num_favs: { $size: { $setIntersection: [actors, "$cast"] } }
    }
  },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $project: { title: 1, _id: 0 } },
  { $skip: 24 },
  { $limit: 1 }
]);

