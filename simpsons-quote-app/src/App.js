import React, { Component } from "react";
import axios from "axios";
import UserSearch from "./ components/UserSearch";
import CharacterContainer from "./ components/CharacterContainer";
import "./App.css";
import "bulma/css/bulma.css";
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
      item.id = Math.round(Math.random() * 10000000);
    });
    this.setState({ quotes: data });
  }

  onDeleteItem = (id) => {
    const quotes = [...this.state.quotes];
    const index = quotes.findIndex((item) => item.id === id);
    quotes.splice(index, 1);
    this.setState({ quotes: quotes });
  };

  render() {
    if (!this.state.quotes) {
      return <p>Loading ...</p>;
    }
    // console.log(this.state);
    const filteredArray = this.state.quotes.filter((quote) => {
      // console.log(quote.character, this.state.searchInput);
      return quote.character
        .toLowerCase()
        .includes(this.state.searchInput.toLowerCase());
    });

    return (
      <>
        <div className="inputContainer">
          <h1 className="has-text-centered is-size-1"> Simpsons Quotes</h1>
          <input
            type="text"
            placeholder="Search your Character"
            className="input is-medium is-warning px-4"
            onInput={this.onSearchInput}
          ></input>
        </div>

        <CharacterContainer
          quotes={filteredArray.length ? filteredArray : this.state.quotes}
          onDeleteItem={this.onDeleteItem}
        />
      </>
    );
  }
}

export default App;
