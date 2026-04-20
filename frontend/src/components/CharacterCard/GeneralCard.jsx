import React from "react";
import "./CharacterCard.css";

export default function CharacterCard({
  itemName,
  itemImage,
  itemRarity,
  itemIcon1,
  itemIcon2,
}) {
  return (
    <>
      <div className={`character-card__component card-${itemRarity}`}>
        <img src={itemImage} className="character-image" alt={itemName} />

        <div className="character-card__header">
          <img
            className="character-card__icon"
            src={itemIcon1.icon}
            alt={itemIcon1.name}
          />
          {itemIcon2 === undefined ? (
            []
          ) : (
            <img
              className="character-card__icon"
              src={itemIcon2.icon}
              alt={itemIcon2.name}
            />
          )}
        </div>

        <div className="character-card__footer">
          <h1 className="character-card__name">{itemName}</h1>
        </div>
      </div>
    </>
  );
}
