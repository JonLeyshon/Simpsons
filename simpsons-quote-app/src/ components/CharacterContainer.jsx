import React, { Component } from "react";
import CharacterItem from "./CharacterItem";
class CharacterContainer extends Component {
  state = {};
  render() {
    const { data } = this.props.data.data;
    console.log(data);

    return data.map((item) => {
      <CharacterItem {...item} />;
    });
  }
}

export default CharacterContainer;
