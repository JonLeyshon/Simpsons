import React, { Component } from "react";
import CharacterContainer from "./CharacterContainer";
class UserSearch extends Component {
  state = {};
  render() {
    return (
      <>
        <input type="text" placeholder="Search for a Character" />
      </>
    );
  }
}

export default UserSearch;
