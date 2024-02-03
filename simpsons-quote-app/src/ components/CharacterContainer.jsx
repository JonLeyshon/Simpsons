import React, { Component } from "react";
import CharacterItem from "./Character";
class CharacterContainer extends Component {
  state = {};
  render() {
    // console.log(this.props);
    const { quotes, onDeleteItem } = this.props;
    // console.log(quotes);
    return quotes.map((item, index) => {
      return (
        <CharacterItem {...item} onDeleteItem={onDeleteItem} index={index} />
      );
    });
  }
}

export default CharacterContainer;
