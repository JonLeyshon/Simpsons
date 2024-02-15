import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  onDeleteItem,
  onLikedItem,
  onSearchInput,
  onSortItemValue,
} from "./arrayManip";
import CharacterContainer from "./ components/CharacterContainer";
import "bulma/css/bulma.css";
import "./App.css";

const App = () => {
  const [quotes, setQuotes] = useState();
  const [likedtotal, setLikedTotal] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `https://thesimpsonsquoteapi.glitch.me/quotes?count=100`
        );
        const modifiedData = data.map((item) => ({
          ...item,
          id: Math.round(Math.random() * 10000000),
          liked: false,
        }));
        setQuotes(modifiedData);
      } catch (error) {
        console.log("Error getting data", error);
      }
    };
    getData();
  }, []);

  console.log(quotes);

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
            // onInput={this.onSearchInput}
          />
          {/* <p> {this.state.errors && this.state.errors.name} </p> */}
          <select className="select">
            <option value="Random">Random</option>
            <option value="Asc">A-Z</option>
            <option value="Desc">Z-A</option>
          </select>
        </div>
        <h3 className="">Number of Liked quotes: {likedtotal}</h3>
      </header>

      <CharacterContainer
        quotes={quotes}
        // onDeleteItem={this.onDeleteItem}
        // onLikedItem={this.onLikedItem}
        // likedTotal={this.state.likedTotal}
      />
    </>
  );
};

export default App;
