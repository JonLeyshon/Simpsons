import React, { Component } from "react";
import axios from "axios";
import UserSearch from "./ components/UserSearch";
import CharacterContainer from "./ components/CharacterContainer";
import "./App.css";
import "bulma/css/bulma.css";
class App extends Component {
  state = { searchInput: "", likedTotal: 0 };

  onSearchInput = (e) => {
    this.setState({ searchInput: e.target.value });
  };

  async componentDidMount() {
    const { data } = await axios.get(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=100`
    );
    data.forEach((item) => {
      item.id = Math.round(Math.random() * 10000000);
      item.liked = false;
    });
    this.setState({ quotes: data });
  }

  onDeleteItem = (id) => {
    const quotes = [...this.state.quotes];
    const index = quotes.findIndex((item) => item.id === id);
    quotes.splice(index, 1);
    this.setState({ quotes: quotes });
  };

  onLikedItem = (id) => {
    const quotes = [...this.state.quotes];
    let likedTotal = 0;
    console.log(likedTotal);
    console.log(quotes);
    const index = quotes.findIndex((item) => item.id === id);
    quotes[index].liked = !quotes[index].liked;
    quotes.forEach((item) => {
      if (item.liked === true) {
        likedTotal++;
      }
    });
    this.setState({ quotes: quotes, likedTotal: likedTotal });
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
        <header className="headingContainer">
          <h1 className="has-text-centered is-size-1">Simpsons Quotes</h1>
          <div className="inputContainer">
            <div className="field is-grouped is-grouped-centered">
              <div className="control is-expanded">
                <input
                  type="text"
                  placeholder="Search your Character"
                  className="input is-medium is-warning is-half px-4"
                  onInput={this.onSearchInput}
                />
              </div>
            </div>
            <h3 className="has-text-centered">
              {" "}
              Amount of quotes Liked: {this.state.likedTotal}
            </h3>
          </div>
        </header>

        <CharacterContainer
          quotes={filteredArray.length ? filteredArray : this.state.quotes}
          onDeleteItem={this.onDeleteItem}
          onLikedItem={this.onLikedItem}
          likedTotal={this.state.likedTotal}
        />
      </>
    );
  }
}

export default App;
