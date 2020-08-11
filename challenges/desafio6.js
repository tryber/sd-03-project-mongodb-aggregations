// Vamos explorar mais operadores aritm�ticos!

// Considerando todos os filmes que ganharam o Oscar pelo menos uma vez, calcule o maior valor, menor valor, m�dia e o desvio padr�o das avalia��es (campo imdb.rating). Para a m�dia e o desvio padr�o arredonde os valores para uma casa decimal utilizando o $round.

// Dica: todos os filmes na cole��o, que j� ganharam um Oscar, come�am com uma sequ�ncia de string parecida com essas abaixo, portanto $regex � um operador bem-vindo:

// Won 10 Oscars
// Won 1 Oscar

// Utilizem o $stdDevSamp para calcular o desvio padr�o.

// O resultado da sua query deve ter o seguinte formato:

// {
//   "maior_rating" : <maior_rating>,
//   "menor_rating" : <menor_rating>,
//   "media_rating" : <media_rating>,
//   "desvio_padrao" : <desvio_padrao>
// }
db.movies.aggregate([
{
  $match: {
    awards: { $regex: /Won \d+ Oscars/ }
  }
},
{
  $group: {
    _id: 0,
    "maior_rating": { $max: "$imdb.rating"} ,
    "menor_rating": { $min: "$imdb.rating"} ,
    "media_rating": { $avg: "$imdb.rating"} ,
    "desvio_padrao": { $stdDevSamp: "$imdb.rating"}
  }
},
{
  $project: {
    _id: 0,
    maior_rating: 1,
    menor_rating: 1,
    media: { $round: ["$media_rating", 1]},
    dp: { $round: ["$desvio_padrao", 1]}
  }
}]);
