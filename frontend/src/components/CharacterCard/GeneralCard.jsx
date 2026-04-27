import React from "react";
import "./CharacterCard.css";

function StarRating({ rarity }) {
  const count = parseInt(rarity, 10) || 5;
  return (
    <div className="lc-card__stars">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="lc-card__star">★</span>
      ))}
    </div>
  );
}

export default function GeneralCard({
  itemName,
  itemImage,
  itemRarity,
  itemIcon1,
}) {
  const rarity = parseInt(itemRarity, 10) || 5;

  return (
    <div className={`lc-card card-${rarity}`}>
      {/* Left: image */}
      <div className="lc-card__image-wrap">
        <img src={itemImage} className="lc-card__image" alt={itemName} />
      </div>

      {/* Right: info */}
      <div className="lc-card__info">
        {/* Path icon */}
        {itemIcon1 && (
          <img
            className="lc-card__path-icon"
            src={typeof itemIcon1 === "string" ? itemIcon1 : itemIcon1?.icon}
            alt="path"
          />
        )}
        <p className="lc-card__name">{itemName}</p>
        <StarRating rarity={rarity} />
      </div>
    </div>
  );
}
