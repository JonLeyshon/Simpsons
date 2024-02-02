import React, { Component } from "react";
class CharacterItem extends Component {
  state = {};
  render() {
    const { character, image, quote, onDeleteItem, index } = this.props;
    // console.log(this.props);
    return (
      <div className="character">
        <p key={this.props.character}>{this.props.character}</p>
        <img src={this.props.image} alt={this.props.character} />
        <p>{this.props.quote}</p>
        <button onClick={() => onDeleteItem(index)}>X</button>
        <button>Like</button>
      </div>
    );
  }
}

export default CharacterItem;
