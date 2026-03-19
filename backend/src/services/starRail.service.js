import axios from "axios"; // Para manipular os json vindo direto do GitHub

// Esse link está relativo ao código do personagem
const GITHUB_URL = "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/";

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

export function getCharacterAllInformations(characterId){
    // Essa função é exclusiva para os personagens que são, em especial, do modo de jogo normal.
    const characterData = axios.get(`${GITHUB_URL}index_new/pt/characters.json`)
        .then(response => {
            const characters = response.data;
            const characterData = characters[characterId];

            if(!characterData){
                return null;
            }

            return {
                id: characterId,
                name: characterData.name,
                rarity: characterData.rarity,
                element: characterData.element,
                max_sp: characterData.max_sp,
                ranks: characterData.ranks,
                skills: characterData.skills,
                skills_trees: characterData.skills_trees,
                icon: `${GITHUB_URL}${characterData.icon}`,
                preview: `${GITHUB_URL}${characterData.preview}`,
                portrait: `${GITHUB_URL}${characterData.portrait}`
            }
        });

    return characterData;
}