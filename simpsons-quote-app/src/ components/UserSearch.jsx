import React, { Component } from "react";
class UserSearch extends Component {
  state = {};
  render() {
    const { data, searchTerm, handleSearchTerm } = this.props;
    console.log(searchTerm);
    return (
      <>
        <input
          type="text"
          onInput={(e) => {
            this.setState({ searchTerm: e.target.value });
            handleSearchTerm(this.state.searchTerm);
          }}
        />
      </>
    );
  }
}

export default UserSearch;
