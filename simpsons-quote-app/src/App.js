import React, { Component } from "react";
import axios from "axios";
import UserSearch from "./ components/UserSearch";
import CharacterContainer from "./ components/CharacterContainer";
import "./App.css";
class App extends Component {
  state = { searchInput: "" };

  onSearchInput = (e) => {
    this.setState({ searchInput: e.target.value });
  };

  async componentDidMount() {
    const { data } = await axios.get(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=100`
    );
    data.forEach((item) => {
      item.id = Math.round(Math.random() * 1000000);
    });
    this.setState({ quotes: data });
  }

  render() {
    if (!this.state.quotes) {
      return <p>Loading ...</p>;
    }
    console.log(this.state);
    const filteredArray = this.state.quotes.filter((quote) => {
      console.log(quote.character, this.state.searchInput);
      return quote.character
        .toLowerCase()
        .includes(this.state.searchInput.toLowerCase());
    });
    console.log(filteredArray);
    return (
      <>
        <input
          type="text"
          placeholder="Search your Character"
          onInput={this.onSearchInput}
        ></input>
        <CharacterContainer
          quotes={filteredArray.length ? filteredArray : this.state.quotes}
        />
      </>
    );
  }
}

export default App;
