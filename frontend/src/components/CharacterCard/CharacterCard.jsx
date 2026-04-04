import React from "react";
import "./CharacterCard.css";

export default function CharacterCard({ character_name = "Clara", character_image = "vazio", character_element = "vazio", character_path = "vazio" }) {

    return(
        <>
            <div className="character-card__component">
                <img src={character_image} className="character-image" alt={character_name} />

                <div className="character-card__header">
                    <img className="character-card__icon" src={character_element} alt={character_name} />
                    <img className="character-card__icon" src={character_path} alt={character_name} />
                </div>

                <div className="character_footer">
                    <h1 className="character_name">
                        {character_name}
                    </h1>
                </div>
            </div>
        </>
    );
}