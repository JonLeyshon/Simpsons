import React, { Component } from "react";
class CharacterItem extends Component {
  state = {};

  render() {
    // console.log(this.props);
    const { character, image, quote, id, onDeleteItem, index } = this.props;

    return (
      <div key={id}>
        <p>{character}</p>
        <img src={image} alt={character} />
        <p>{quote}</p>
        <button onClick={() => onDeleteItem(index)}>X</button>
        <button>Like</button>
      </div>
    );
  }
}

export default CharacterItem;
