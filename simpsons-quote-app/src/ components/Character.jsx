import React, { Component } from "react";
class CharacterItem extends Component {
  state = {};

  render() {
    console.log(this.props);
    const { character, image, quote, id, characterDirection, onDeleteItem } =
      this.props;

    return (
      <>
        <div key={id} className="character is-align-items-center columns ">
          <p className="name  has-text-centered is-size-3 column">
            {character}
          </p>
          <p className="quote has-text-centered is-size-3 column">{quote}</p>
          <img
            className="image has-text-centered is-size-3 column"
            src={image}
            alt={character}
          />
        </div>
        <div className="columns">
          <button
            className="button is-primary column"
            onClick={() => onDeleteItem(id)}
          >
            X
          </button>
          <button className="button is-warning column">Like</button>
        </div>
      </>
    );
  }
}

export default CharacterItem;
