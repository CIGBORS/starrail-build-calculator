import { 
    getCharacterById, 
    getCharacterAllInformations as getCharacterAllInfo,
    getCharacterByName as getCharacterByNameString,
    getAllCharacters
} from "../services/starRail.service.js";

export async function getCharacters(req, res){
    const allCharacters = await getAllCharacters();

    if(!allCharacters){
        console.log("Sem personagem");
        res.json({ error: "Personagens não encontrados" })
    } else {
        res.json(allCharacters);
    }
}

export function getCharacter(req, res){
    const characterId = req.params.id;

    getCharacterById(characterId).then(character => {
        if(!character){
            console.log("Sem personagem");
            res.json({ error: "Personagem não encontrado" });
        } else {
            res.json(character); // Passando as informações em JSON
        }
    });
}

export function getCharacterAllInformations(req, res){
    const characterId = req.params.id;

    getCharacterAllInfo(characterId).then(character => {
        if(!character){
            console.log("Sem personagem");
            res.json({ error: "Personagem não encontrado" });
        } else {
            res.json(character);
        }
    });
}

export function getCharacterByName(req, res){
    const characterName = req.params.name;

    getCharacterByNameString(characterName).then(character => {
        if(!character){
            console.log("Sem personagem");
            res.json({ error: "Personagem não encontrado" });
        } else {
            res.json(character);
        }
    })
}