import { getCharacterById } from "../services/starRail.service.js";

export function getCharacter(req, res){
    const characterId = req.params.id;

    getCharacterById(characterId).then(character => {
        if(!character){
            console.log("Sem personagem");
        } else {
            res.json(character); // Passando as informações em JSON
        }
    });
}