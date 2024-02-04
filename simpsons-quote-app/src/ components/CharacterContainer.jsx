import React, { Component } from "react";
import CharacterItem from "./Character";
class CharacterContainer extends Component {
  state = {};
  render() {
    console.log(this.props);
    const { quotes, onDeleteItem, onLikedItem, likedTotal } = this.props;
    // console.log(quotes);
    return quotes.map((item) => {
      return (
        <CharacterItem
          {...item}
          onDeleteItem={onDeleteItem}
          onLikedItem={onLikedItem}
          likedTotal={this.props.likedTotal}
        />
      );
    });
  }
}

export default CharacterContainer;
