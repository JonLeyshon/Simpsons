import React from "react";
import CharacterItem from "./Character";

const CharacterContainer = (props) => {
  const { quotes } = props;
  console.log(quotes);
  if (!quotes) {
    return <> Loading....</>;
  } else {
    return quotes.map((item) => {
      return (
        <CharacterItem
          {...item}
          //   onDeleteItem={onDeleteItem}
          //   onLikedItem={onLikedItem}
        />
      );
    });
  }
};

export default CharacterContainer;
