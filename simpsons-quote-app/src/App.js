import React, { Component } from "react";
import axios from "axios";
import UserSearch from "./ components/UserSearch";
import CharacterContainer from "./ components/CharacterContainer";
import "bulma/css/bulma.css";
import "./App.css";
import Joi from "joi";

class App extends Component {
  state = { searchInput: "", likedTotal: 0, listOrder: "random" };

  schema = { name: Joi.string().min(2).max(20) };

  onSearchInput = async (e) => {
    this.setState({ searchInput: e.target.value });

    const _joiInstance = Joi.object(this.schema);

    try {
      await _joiInstance.validateAsync({ name: this.state.searchInput });
    } catch (e) {
      console.log(e);
    }
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
    const index = quotes.findIndex((item) => item.id === id);
    quotes[index].liked = !quotes[index].liked;
    this.setState({ quotes: quotes });
  };

  onSortItemValue = (e) => {
    // this.setState({ listOrder: e.target.value });
    const sortingValue = e.target.value;
    // console.log(sortingValue);
    const quotes = [...this.state.quotes];
    let sortedQuotes = [...quotes];
    if (sortingValue === "random") {
      sortedQuotes = quotes.sort(() => Math.random() - 0.5);
    } else {
      sortedQuotes = quotes.sort((a, b) => {
        return a.character.localeCompare(b.character);
      });
      if (sortingValue === "Desc") {
        sortedQuotes.reverse();
      }
    }
    console.log(sortedQuotes);
    this.setState({ quotes: sortedQuotes });
  };

  render() {
    console.log(this.state);
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

    const numberOfLikedQuotes = this.state.quotes.filter(
      (quote) => quote.liked
    ).length;

    // console.log(this.state);
    return (
      <>
        <header className="is-flex is-centered">
          <img src="https://ch12-thesimpsons.netlify.app/static/media/simpsons.5ec25fe774cfe1a5641fb30ba7ad1292.svg" />
          <div className="inputContainer">
            <input
              type="text"
              placeholder="Search your Character"
              id="name"
              name="name"
              className="input is-warning is-medium"
              onInput={this.onSearchInput}
            />
            <select onChange={this.onSortItemValue} className="select">
              <option value="Random">Random</option>
              <option value="Asc">A-Z</option>
              <option value="Desc">Z-A</option>
            </select>
          </div>
          <h3 className="">
            {`Number of Liked quotes: ${numberOfLikedQuotes}`}
          </h3>
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
