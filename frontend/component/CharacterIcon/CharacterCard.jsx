import React from "react";
import "CharacterCard.css";

export default function CharacterCard({ character_name = "Clara", character_image = "fodase", character_element = "", character_path = "" }) {

    return(
        <>
            <div className="character-card__component">
                <div className="character-card__header">
                    <img src={character_image} alt={character_name} />
                </div>
            </div>
        </>
    );
}