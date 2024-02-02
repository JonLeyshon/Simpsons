import React, { Component } from "react";
import axios from "axios";
import UserSearch from "./ components/UserSearch";
import "./App.css";
class App extends Component {
  state = {};

  onSearchInput = (e) => {
    this.setState({ searchInput: e.target.value });
    this.handleFilteredData();
  };

  async componentDidMount() {
    const { data } = await axios.get(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=100`
    );
    this.setState({ quotes: data });
  }

  handleFilteredData = () => {
    const quotesCopy = [...this.state.quotes];
    const filteredArray = quotesCopy.filter((quote) => {
      return quote.character.includes(this.state.searchInput);
    });

    //ChatGPT code:
    if (filteredArray.length > 0) {
      this.setState({ quotes: filteredArray });
    } else {
      // If the filtered array is empty, you may want to handle it accordingly
      // For example, reset the quotes to the original array
      this.setState({ quotes: quotesCopy });
    }

    // this.setState({ quotes: filteredArray });
  };

  render() {
    console.log(this.state);
    return (
      <>
        <input
          type="text"
          placeholder="Search your Character"
          onInput={this.onSearchInput}
        ></input>
      </>
    );
  }
}

export default App;
