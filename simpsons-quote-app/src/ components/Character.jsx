import React, { Component } from "react";
class CharacterItem extends Component {
  state = {};

  render() {
    // console.log(this.props);
    const {
      character,
      image,
      quote,
      id,
      characterDirection,
      onDeleteItem,
      liked,
      onLikedItem,
    } = this.props;

    // On click change liked to the opposite of itself?

    return (
      <>
        <div key={id} className="character is-align-items-center  columns ">
          <p className="name has-text-centered is-size-3 column">{character}</p>
          {characterDirection === "Left" && (
            <img
              className="image has-text-centered is-size-3 column"
              src={image}
              alt={character}
            />
          )}
          <p className="quote has-text-centered is-size-3 column">"{quote}"</p>
          {characterDirection !== "Left" && (
            <img
              className="image has-text-centered is-size-3 column"
              src={image}
              alt={character}
            />
          )}
        </div>
        <div className="columns justify-content-center align-items-center">
          <button
            className="button is-primary column p-2"
            onClick={() => onLikedItem(id)}
          >
            {liked ? "Unlike" : "Like"}
          </button>
          <button
            className="button is-danger column"
            onClick={() => onDeleteItem(id)}
          >
            Delete
          </button>
        </div>
      </>
    );
  }
}

export default CharacterItem;
