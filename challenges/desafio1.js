// Ajude a Trybe a escolher um filme para a pr�xima noite! Baseado em uma pesquisa, decidimos que os filmes em potencial devem atender aos seguintes crit�rios:

//  imdb.rating deve ser ao menos 7;
//  genres n�o deve conter Crime ou Horror;
//  rated deve ser igual a PG ou G;
//  languages cont�m English e Spanish.

// Utilizando a cole��o movies, fa�a um pipeline que retorne todos esses filmes.

// Sua query deve retornar 41 documentos.

db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      genres: { $nin: ["Crime", "Horror"] },
      rated: { $in: ["PG", "G"] },
      languages: { $all: ["English", "Spanish"] }
      }
  }
]).pretty();
