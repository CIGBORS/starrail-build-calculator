import axios from "axios"; // Para manipular os json vindo direto do GitHub
import {
  ConverterCampoId,
  FormatNomesPersonagens,
} from "./utils/utilidades.service.js";

// Esse link está relativo ao código do personagem
export const GITHUB_URL =
  "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/";

async function fetchJson(endpoint) {
  const response = await axios.get(`${GITHUB_URL}index_new/pt/${endpoint}`);
  return response.data;
}

export async function getAllCharacters() {
  const characterData = await fetchJson("characters.json");
  return characterData;
}

export async function getAllAvatars() {
  const avatarsData = await fetchJson("avatars.json");
  return Object.fromEntries(
    Object.entries(avatarsData).map(([key, avatar]) => [
      key,
      {
        ...avatar,
        icon_url: avatar.icon ? `${GITHUB_URL}${avatar.icon}` : null,
      },
    ]),
  );
}

export async function getCharacterById(characterId) {
  return axios
    .get(`${GITHUB_URL}index_new/pt/characters.json`) // Lembrando que setei PT por que nós somos brasileiros
    .then((response) => {
      const characters = response.data;
      const characterData = characters[characterId];

      if (!characterData) {
        return null;
      }

      // O CÓDIGO ABAIXO É PARA MONTAR O PERSONAGEM COM OS DADOS QUE QUERO >:)
      return {
        id: characterId,
        name: characterData.name,
        icon: `${GITHUB_URL}${characterData.icon}`,
      };
    });
}

export async function getCharacterAllInformations(characterId) {
  // Essa função é exclusiva para os personagens que são, em especial, do modo de jogo normal
  const charactersData = await fetchJson("characters.json");
  const characterData = charactersData[characterId];

  if (!characterData) {
    return null;
  }

  // Relacionamento com os elementos do personagem
  const elementsData = await fetchJson("elements.json");
  const elementData = elementsData[characterData.element];

  // Convertendo o ícone para a foto correta
  elementData.icon = `${GITHUB_URL}${elementData.icon}`;

  // Relacionamento com as habilidades do personagem escolhido
  const skillsData = await fetchJson("character_skills.json");

  const characterSkills = characterData.skills.map((skillId) => ({
    id: skillId,
    ...skillsData[skillId],
    icon:
      skillsData[skillId] || skillsData != ""
        ? `${GITHUB_URL}${skillsData[skillId].icon}`
        : "Not found",
  }));

  // Relacionamento com ranks costelação (?)
  /*
        Verificar a viabilidade de puxar os componentes dentro do que está no characterRanks, mas acredito que não seja necessário
    */
  const ranksData = await fetchJson("character_ranks.json");

  const characterRanks = characterData.ranks.map((rankId) => ({
    id: rankId,
    ...ranksData[rankId],
    icon:
      ranksData[rankId] || ranksData[rankId] != ""
        ? `${GITHUB_URL}${ranksData[rankId].icon}`
        : "Not found",
  }));

  // Relacionamento com skill tree, verificar se vai ser necessário, porque aqui é mais componente
  // const skillTreeData = await fetchJson("character_skill_trees.json");

  return {
    id: characterId,
    name: characterData.name,
    rarity: characterData.rarity,
    element: elementData,
    max_sp: characterData.max_sp,
    ranks: characterRanks,
    skills: characterSkills,
    skills_trees: characterData.skills_trees,
    icon: `${GITHUB_URL}${characterData.icon}`,
    preview: `${GITHUB_URL}${characterData.preview}`,
    portrait: `${GITHUB_URL}${characterData.portrait}`,
  };
}

export async function getCharacterByName(characterName) {
  // Esse endpoint serve para retornar apenas as informações básicas do personagem pelo o nome, como ícone para quando tivermos que ter pesquisas por nome e tudo mais
  const characterData = await fetchJson("characters.json");

  for (let key in characterData) {
    if (characterData[key].name === characterName) {
      return {
        id: characterData[key].id,
        name: characterData[key].name,
        icon: `${GITHUB_URL}${characterData[key].icon}`,
      };
    }
  }
}

export async function getCharactersFilters(filters) {
  //desistruturação dos filters
  const { name, rarity, path, element } = filters;

  //puxa dos json do git
  const charactersData = await fetchJson("characters.json");
  const pathsData = await fetchJson("paths.json");
  const elementsData = await fetchJson("elements.json");

  //converte em array
  const characters = Object.values(charactersData);
  //converte em array pegando só o nome e id no estilo [{nome:id}]
  const pathNameToId = ConverterCampoId("name", "id", pathsData);
  const elementsNameToId = ConverterCampoId("name", "id", elementsData);

  const selectedPaths = path?.map((p) => pathNameToId[p]);
  const selectedElements = element?.map((p) => elementsNameToId[p]);
  const filtered = characters
    .filter((character) => {
      if (name) {
        let searchName = FormatNomesPersonagens(character, pathsData);

        if (!searchName.toLowerCase().includes(name.toLowerCase())) {
          return false;
        }
      }

      if (rarity && rarity.length && !rarity.includes(character.rarity)) {
        return false;
      }

      if (
        selectedPaths &&
        selectedPaths.length &&
        !selectedPaths.includes(character.path)
      ) {
        return false;
      }

      if (
        selectedElements &&
        selectedElements.length &&
        !selectedElements.includes(character.element)
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    name: [
      ...new Set(
        filtered
          .filter((c) => {
            if (c.name === "{NICKNAME}" && !c.tag.includes("playergirl")) {
              return false;
            }
            return true;
          })
          .map((c) => {
            if (c.name === "7 de Março") {
              return `${c.name} (${pathsData[c.path]?.name})`;
            }

            if (c.name === "{NICKNAME}") {
              return `Desbravador (${pathsData[c.path]?.name})`;
            }

            return c.name;
          }),
      ),
    ].sort((a, b) => a.localeCompare(b)),

    rarity: [...new Set(filtered.map((c) => c.rarity))],

    path: [...new Set(filtered.map((c) => pathsData[c.path]?.name))].sort(
      (a, b) => a.localeCompare(b),
    ),

    element: [
      ...new Set(filtered.map((c) => elementsData[c.element]?.name)),
    ].sort((a, b) => a.localeCompare(b)),
  };
}

export async function getAllCharactersCard(filters) {
  const { name, rarity, path, element } = filters;

  const charactersData = await fetchJson("characters.json");
  const elementsData = await fetchJson("elements.json");
  const pathsData = await fetchJson("paths.json");

  const charactersArray = Object.values(charactersData);

  const filtered = charactersArray.filter((character) => {
    if (name) {
      const searchName = FormatNomesPersonagens(character, pathsData);

      if (!searchName.toLowerCase().includes(name.toLowerCase())) {
        return false;
      }
    }

    if (rarity && rarity.length && !rarity.includes(character.rarity)) {
      return false;
    }

    if (path && path.length && !path.includes(pathsData[character.path].name)) {
      return false;
    }

    if (
      element &&
      element.length &&
      !element.includes(elementsData[character.element].name)
    ) {
      return false;
    }

    return true;
  });

  return filtered.map((character) => ({
    name: FormatNomesPersonagens(character, pathsData),
    preview: `${GITHUB_URL}${character.preview}`,
    rarity: character.rarity,
    element: {
      name: elementsData[character.element].name,
      icon: `${GITHUB_URL}${elementsData[character.element].icon}`,
    },
    path: {
      name: pathsData[character.path].name,
      icon: `${GITHUB_URL}${pathsData[character.path].icon}`,
    },
  }));
}
