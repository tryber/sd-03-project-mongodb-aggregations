// Nosso dataset de filmes tem muitos documentos diferentes, alguns com t�tulos "mais complexos" do que outros. Se quisermos analisar nossa cole��o para encontrar t�tulos de filmes que t�m uma s� palavra no t�tulo, poder�amos buscar todos os filmes do dataset e processar isso na aplica��o, mas o Aggregation Framework nos permite fazer isso diretamente no lado do banco de dados.

// Crie um pipeline que adicione um campo title_split contendo a lista de palavras presentes em title e retorne apenas o novo campo title_split dos filmes com o t�tulo composto apenas de uma palavra, ordernando-os por title em ordem alfab�tica. Por exemplo, "Cinderela" e "3-25" devem entrar nessa contagem, mas "Cast Away" n�o.

// Dica: utilize os operadores $split, $size e $sort para te auxiliar.
// Sua query deve retornar 8068 documentos.

db.movies.aggregate([
  { $addFields: { title_split: { $split: ["$title", " "] } } },
  {
    $project: {
      _id: 0,
      title_split: 1,
    }
  },
  { $match: { title_split: { $size: 1 } } },
  { $sort: { title_split: 1 } }
]);
