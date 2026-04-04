import React from "react";
import "./CharacterCard.css";

export default function CharacterCard({ characterName, characterImage, characterRarity, characterElement, characterPath }) {

    return(
        <>
            <div className="character-card__component">
                <img src={characterImage} className="character-image" alt={characterName} />

                <div className="character-card__header">
                    <img className="character-card__icon" src={characterElement.icon} alt={characterElement.name} />
                    <img className="character-card__icon" src={characterPath.icon} alt={characterPath.name} />
                </div>

                <div className="character_footer">
                    <h1 className="character_name">
                        {characterName}
                    </h1>
                </div>
            </div>
        </>
    );
}