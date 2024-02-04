import React, { Component } from "react";
import axios from "axios";
import UserSearch from "./ components/UserSearch";
import CharacterContainer from "./ components/CharacterContainer";
import "bulma/css/bulma.css";
import "./App.css";
class App extends Component {
  state = { searchInput: "", likedTotal: 0, listOrder: null };

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

  // onSortQuotes = () => {
  //   const quotes = [this.state.quotes];
  //   const sortedQuotes

  // }

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
        <header>
          <img src="https://ch12-thesimpsons.netlify.app/static/media/simpsons.5ec25fe774cfe1a5641fb30ba7ad1292.svg" />
          <div className="inputContainer">
            <input
              type="text"
              placeholder="Search your Character"
              className="input is-warning is-medium"
              onInput={this.onSearchInput}
            />
            <select className="select">
              <option value="Asc">A-Z</option>
              <option value="Desc">Z-A</option>
              <option value="Random">Random</option>
            </select>
          </div>
          <h3 className=""> Amount of quotes Liked: {this.state.likedTotal}</h3>
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
