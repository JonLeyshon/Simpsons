import React, { Component } from "react";
import CharacterItem from "./CharacterItem";
class CharacterContainer extends Component {
  state = {};
  render() {
    // console.log(this.props);
    const data = this.props.data.data;
    // console.log(data);

    return data.map((item, index) => {
      return <CharacterItem {...item} onDeleteItem={this.props.onDeleteItem} />;
    });
  }
}

export default CharacterContainer;
