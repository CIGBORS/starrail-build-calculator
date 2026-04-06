//characters
import {
  getCharacterById,
  getCharacterAllInformations as getCharacterAllInfo,
  getCharacterByName as getCharacterByNameString,
  getAllCharacters,
  getCharactersFilters as getCharFiltersServ,
  getAllCharactersCard as getCharactersCard,
} from "../services/starRail.service.js";

export async function getCharacters(req, res) {
  const allCharacters = await getAllCharacters();

  if (!allCharacters) {
    console.log("Sem personagem");
    res.json({ error: "Personagens não encontrados" });
  } else {
    res.json(allCharacters);
  }
}

export function getCharacter(req, res) {
  const characterId = req.params.id;

  getCharacterById(characterId).then((character) => {
    if (!character) {
      console.log("Sem personagem");
      res.json({ error: "Personagem não encontrado" });
    } else {
      res.json(character); // Passando as informações em JSON
    }
  });
}

export function getCharacterAllInformations(req, res) {
  const characterId = req.params.id;

  getCharacterAllInfo(characterId).then((character) => {
    if (!character) {
      console.log("Sem personagem");
      res.json({ error: "Personagem não encontrado" });
    } else {
      res.json(character);
    }
  });
}

export function getCharacterByName(req, res) {
  const characterName = req.params.name;

  getCharacterByNameString(characterName).then((character) => {
    if (!character) {
      console.log("Sem personagem");
      res.json({ error: "Personagem não encontrado" });
    } else {
      res.json(character);
    }
  });
}

export async function getCharactersFilters(req, res) {
  try {
    const { name, rarity, path, element } = req.body;
    console.log("Filtros recebidos:", {
      name,
      rarity,
      path,
      element,
    });
    const data = await getCharFiltersServ({
      name,
      rarity,
      path,
      element,
    });

    console.log("return do back", data);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function getAllCharactersCards(req, res) {
  const allCards = await getCharactersCard();

  if (!allCards) {
    console.log("Sem personagem");
    res.json({ error: "Personagens não encontrados dentro da base de dados " });
  } else {
    res.json(allCards);
  }
}
