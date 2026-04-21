//Converte um valor em id (exemplo: nome)
//transforma o objeto em um array com reduce() criando um novo dicionario no formato
// {nome:id}
export function ConverterCampoId(campo, id, dados) {
  const dadosConvertidos = Object.values(dados).reduce((nvdicionario, item) => {
    nvdicionario[item[campo]] = item[id];
    return nvdicionario;
  }, {});

  return dadosConvertidos;
}

//Lida com casos particulares dos nomes da base de dados, pegando o nome e o caminho do personagem ficando:
//nome (caminho)
export function FormatNomesPersonagens(personagem, pathsData) {
  switch (personagem.name) {
    case "{NICKNAME}":
      return `Desbravador (${pathsData[personagem.path]?.name})`;

    case "7 de Março":
      return `7 de Março (${pathsData[personagem.path]?.name})`;

    default:
      return personagem.name;
  }
}
