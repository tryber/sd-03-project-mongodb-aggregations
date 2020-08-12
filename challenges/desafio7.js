// Vamos nos aprofundar um pouco mais em nossa cole��o de filmes. Queremos contar quantos filmes cada um dos atores e atrizes do elenco (cast) j� participou e obter uma m�dia do campo imdb.rating para cada um desses atores e atrizes.

// Traga o nome do ator ou atriz, n�mero de filmes em que participou e a m�dia do imdb desses filmes arredondada para uma casa decimal usando o operador $round. Considere somente os membros do elenco de filmes com o idioma ingl�s (English). Exiba a lista em ordem decrescente de documentos pelo n�mero de filmes e nome do ator ou atriz.

// Sua query deve retornar 47055 documentos. Cada documento no resultado deve ter o seguinte formato:

// { "_id" : "John Wayne", "numeroFilmes" : 107, "mediaIMDB" : 6.4 }
db.movies.aggregate([
{
  $match: {
    languages: { $eq: 'English'},
    cast: { $exists: true }
  }
},
{
  $unwind: {
    path: "$cast"
  }
},
{
  $group: {
    _id: "$cast",
    numeroFilmes: { $sum: 1 },
    notas: { $avg: "$imdb.rating"}
  }
},
{
  $sort: {
  numeroFilmes: -1,
  _id: -1
  }
},
{
  $project: {
    _id: 1,
    numeroFilmes: 1,
    mediaIMDB: { $round: ["$notas", 1]}
  }
}
])
