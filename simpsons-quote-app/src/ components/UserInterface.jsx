import React, { Component } from "react";
import UserSearch from "./UserSearch";
import CharacterContainer from "./CharacterContainer";

class UserInterface extends Component {
  state = {};
  render() {
    const { data } = this.props;

    return (
      <>
        <UserSearch data={data} />
        <CharacterContainer
          data={this.props}
          onDeleteItem={this.props.onDeleteItem}
        />
      </>
    );
  }
}

export default UserInterface;
