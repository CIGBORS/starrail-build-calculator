import axios from "axios"; // Para manipular os json vindo direto do GitHub

// Esse link está relativo ao código do personagem
const GITHUB_URL = "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/";

async function fetchJson(endpoint){
    const response = await axios.get(`${GITHUB_URL}index_new/pt/${endpoint}`);
    return response.data;
}

export function getCharacterById(characterId){
    return axios.get(`${GITHUB_URL}index_new/pt/characters.json`) // Lembrando que setei PT por que nós somos brasileiros
        .then(response => {
            const characters = response.data;
            const characterData = characters[characterId];

            if(!characterData){
                return null;
            }

            // O CÓDIGO ABAIXO É PARA MONTAR O PERSONAGEM COM OS DADOS QUE QUERO >:)
            return {
                id: characterId,
                name: characterData.name,
                icon: `${GITHUB_URL}${characterData.icon}`
            }
        });
}

export async function getCharacterAllInformations(characterId){
    // Essa função é exclusiva para os personagens que são, em especial, do modo de jogo normal
    const charactersData = await fetchJson("characters.json");
    const characterData = charactersData[characterId];

    if(!characterData){
        return null;
    }

    // Relacionamento com os elementos do personagem
    const elementsData = await fetchJson("elements.json");
    const elementData = elementsData[characterData.element];

    // Convertendo o ícone para a foto correta
    elementData.icon = `${GITHUB_URL}${elementData.icon}`;

    // Relacionamento com as habilidades do personagem escolhido
    const skillsData = await fetchJson("character_skills.json");

    const characterSkills = characterData.skills.map(skillId => ({
        id: skillId,
        ...skillsData[skillId]
    }));

    return {
        id: characterId,
        name: characterData.name,
        rarity: characterData.rarity,
        element: elementData,
        max_sp: characterData.max_sp,
        ranks: characterData.ranks,
        skills: characterSkills,
        skills_trees: characterData.skills_trees,
        icon: `${GITHUB_URL}${characterData.icon}`,
        preview: `${GITHUB_URL}${characterData.preview}`,
        portrait: `${GITHUB_URL}${characterData.portrait}`
    }
}