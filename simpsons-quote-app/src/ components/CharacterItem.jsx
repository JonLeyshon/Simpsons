import React, { Component } from "react";
class CharacterItem extends Component {
  state = {};
  render() {
    return (
      <div>
        <p key={item.character}>{item.character}</p>
        <img src={item.image} alt={item.character} />
        <p>{item.quote}</p>
      </div>
    );
  }
}

export default CharacterItem;
