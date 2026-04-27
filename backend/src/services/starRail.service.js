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
  const promotionsData = await fetchJson("character_promotions.json");
  const skillTreeData = await fetchJson("character_skill_trees.json");

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

  return filtered.map((character) => {
    const promotion = promotionsData[character.id];
    let stats = null;
    if (promotion && promotion.values && promotion.values.length > 0) {
      const lastAscension = promotion.values[promotion.values.length - 1];
      stats = {
        hp: lastAscension.hp.base + lastAscension.hp.step * 79,
        atk: lastAscension.atk.base + lastAscension.atk.step * 79,
        def: lastAscension.def.base + lastAscension.def.step * 79,
        spd: lastAscension.spd ? lastAscension.spd.base : 0,
        crit_rate: lastAscension.crit_rate ? lastAscension.crit_rate.base : 0,
        crit_dmg: lastAscension.crit_dmg ? lastAscension.crit_dmg.base : 0,
      };
    }

    let trace_stats = [];
    if (character.skill_trees) {
      const uniqueNodes = new Map();
      character.skill_trees.forEach(treeId => {
        const node = skillTreeData[treeId];
        if (node && node.levels && node.levels.length > 0) {
          const props = node.levels[0].properties;
          if (props && props.length > 0) {
            uniqueNodes.set(node.anchor, props);
          }
        }
      });
      uniqueNodes.forEach(props => {
        trace_stats.push(...props);
      });
    }

    return {
      id: character.id,
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
      stats,
      trace_stats,
    };
  });
}

export async function getLightConesFilters() {
  const lcData = await fetchJson("light_cones.json");
  const pathsData = await fetchJson("paths.json");
  const lcArray = Object.values(lcData);

  const items = lcArray.map((c) => ({
    name: c.name,
    icon: `${GITHUB_URL}${c.icon}`,
    path_icon: pathsData[c.path] ? `${GITHUB_URL}${pathsData[c.path].icon}` : null
  }));

  items.sort((a, b) => a.name.localeCompare(b.name));

  return {
    name: items,
  };
}

export async function getAllLightConesCard(filters) {
  const { name } = filters;
  const lcData = await fetchJson("light_cones.json");
  const promotionsData = await fetchJson("light_cone_promotions.json");
  const ranksData = await fetchJson("light_cone_ranks.json");
  const pathsData = await fetchJson("paths.json");

  const lcArray = Object.values(lcData);

  const filtered = lcArray.filter((lc) => {
    if (name && !lc.name.toLowerCase().includes(name.toLowerCase())) {
      return false;
    }
    return true;
  });

  return filtered.map((lc) => {
    const promotion = promotionsData[lc.id];
    let stats = null;
    if (promotion && promotion.values && promotion.values.length > 0) {
      const lastAscension = promotion.values[promotion.values.length - 1];
      stats = {
        hp: lastAscension.hp.base + lastAscension.hp.step * 79,
        atk: lastAscension.atk.base + lastAscension.atk.step * 79,
        def: lastAscension.def.base + lastAscension.def.step * 79,
      };
    }

    const rank = ranksData[lc.id];
    let properties = [];
    if (rank && rank.properties && rank.properties.length > 0) {
      // Usar a primeira superposição (S1) para as propriedades passivas
      properties = rank.properties[0];
    }

    return {
      id: lc.id,
      name: lc.name,
      icon: `${GITHUB_URL}${lc.icon}`,
      preview: `${GITHUB_URL}${lc.preview}`,
      portrait: `${GITHUB_URL}${lc.portrait}`,
      rarity: lc.rarity,
      path: pathsData[lc.path]
        ? {
            name: pathsData[lc.path].name,
            icon: `${GITHUB_URL}${pathsData[lc.path].icon}`,
          }
        : null,
      stats,
      properties,
    };
  });
}

export async function getRelicsFilters() {
  const relicsData = await fetchJson("relic_sets.json");
  const relicsArray = Object.values(relicsData);

  const cavern = relicsArray.filter((r) => r.properties.length === 2);
  const planar = relicsArray.filter((r) => r.properties.length === 1);

  return {
    cavern: [...new Set(cavern.map((r) => r.name))].sort((a, b) =>
      a.localeCompare(b),
    ),
    planar: [...new Set(planar.map((r) => r.name))].sort((a, b) =>
      a.localeCompare(b),
    ),
  };
}

export async function getAllRelicsCard(filters) {
  const { name } = filters;
  const relicsData = await fetchJson("relic_sets.json");
  const relicsArray = Object.values(relicsData);

  const filtered = relicsArray.filter((r) => {
    if (name && !r.name.toLowerCase().includes(name.toLowerCase())) {
      return false;
    }
    return true;
  });

  return filtered.map((r) => {
    const icon = `${GITHUB_URL}${r.icon}`;
    const basePath = icon.replace('.png', '');
    return {
      id: r.id,
      name: r.name,
      icon: icon,
      icons: [
        `${basePath}_0.png`,
        `${basePath}_1.png`,
        `${basePath}_2.png`,
        `${basePath}_3.png`,
        `${basePath}_0.png`,
        `${basePath}_1.png`,
      ],
      desc: r.desc,
      properties: r.properties,
    };
  });
}
