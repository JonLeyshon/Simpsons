import React, { useState } from "react";
import Character from "./Character";

const CharacterContainer = (props) => {
  const { quotes, onDeleteItem, onLikedItem, likedTotal } = props;
  console.log(props);
  return quotes.map((item) => {
    return (
      <Character
        {...item}
        onDeleteItem={onDeleteItem}
        onLikedItem={onLikedItem}
      />
    );
  });
};

export default CharacterContainer;
