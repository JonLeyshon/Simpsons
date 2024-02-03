import React, { Component } from "react";
import CharacterItem from "./Character";
class CharacterContainer extends Component {
  state = {};
  render() {
    // console.log(this.props);
    return (
      <>
        <CharacterItem quotes={this.props.quotes} />;
      </>
    );
  }
}

export default CharacterContainer;
