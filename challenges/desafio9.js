db.trips.aggregate([
    { $match: { birthYear: { $exists: true, $ne: "" } } }, // Não considere documentos com valores vazios ("") ou em que o campo não existe!
    {
        $group: { //  menor e o maior ano de nascimento.
            _id: null,
            maiorAnoNascimento: { $max: { $toInt: "$birthYear" } }, // Para este desafio utilize o operador $toInt para converter de string para valor inteiro.
            menorAnoNascimento: { $min: "$birthYear" }
        }
    }, {
        $project: {
            "_id": 0,
            "maiorAnoNascimento": 1,
            "menorAnoNascimento": 1
        }
    }]);

    // referencia;

    // https://github.com/tryber/sd-03-project-mongodb-aggregations/blob/GGTeodoro-mongodb-aggregations/challenges/desafio9.js
    // feito no dia do projeto CLI na hora do plantão junto do gustavo caetano.