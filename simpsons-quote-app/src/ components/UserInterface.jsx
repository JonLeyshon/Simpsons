import React, { Component } from "react";
import UserSearch from "./UserSearch";
import CharacterContainer from "./CharacterContainer";

class UserInterface extends Component {
  state = {};
  render() {
    console.log(this.props);
    return (
      <>
        <UserSearch data={this.props} />
        <CharacterContainer {this.props} />
      </>
    );
  }
}

export default UserInterface;
