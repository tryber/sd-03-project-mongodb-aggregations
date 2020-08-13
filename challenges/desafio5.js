// Temos outra noite de filme aqui na Trybe e, desta vez, n�s perguntamos � equipe quais s�o seus atores ou atrizes preferidos. Aqui est� o resultado:

// Sandra Bullock
// Tom Hanks
// Julia Roberts
// Kevin Spacey
// George Clooney

// Para filmes lan�ados nos Estados Unidos (campo countries), com tomatoes.viewer.rating maior ou igual a 3, crie um novo campo chamado num_favs, que represente quantos atores ou atrizes da nossa lista de favoritos aparecem no elenco (campo cast) do filme.

// Ordene os resultados por num_favs, tomatoes.viewer.rating e title, todos em ordem decrescente.

// Por fim, utilizando o mesmo pipeline, responda: Qual o t�tulo do vig�simo quinto filme do resultado dessa agrega��o?

// Dica: coloque a lista de atores e atrizes favoritos em uma vari�vel e explore operadores como $size e $setIntersection.

// O resultado da sua query deve ter o seguinte formato:

// { "title" : <nome_do_filme> }

const artistas = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney"
]

db.movies.aggregate([
  {
  $match: {
    cast: {$in: artistas},
    "tomatoes.viewer.rating": {$gte: 3},
    countries: { $in: ["USA"] },
    }
  },
  {
    $addFields: { num_favs: { $size: { $setIntersection: [artistas, "$cast"] } } }
  },
  {
  $project: {
      _id: 0,
      title: 1,
    }
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1
    }
  },
  { $skip: 25 },
  { $limit: 1 }
]);
