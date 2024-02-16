import React, { useState, useEffect } from "react";
import axios from "axios";
import UserSearch from "./ components/UserSearch";
import CharacterContainer from "./ components/CharacterContainer";
import "bulma/css/bulma.css";
import "./App.css";
import Joi from "joi";

const App = () => {
  const [quotes, setQuotes] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [errors, setErrors] = useState(null);
  // const [filteredQuotes, setFilteredQuotes] = useState();

  const schema = { name: Joi.string().min(2).max(20) };

  const onSearchInput = async (e) => {
    setSearchInput(e.target.value);
    try {
      await Joi.validateAsync({ name: e.target.value });
      setErrors(null);
    } catch (e) {
      const errorsMod = {};
      e.details &&
        e.details.forEach((error) => {
          errorsMod[error.context.key] = error.message;
        });
      setErrors(errorsMod);
      console.log(errors);
    }
  };

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

  const onDeleteItem = (id) => {
    const updatedQuotes = [...quotes];
    const index = updatedQuotes.findIndex((item) => item.id === id);
    updatedQuotes.splice(index, 1);
    setQuotes(updatedQuotes);
  };

  const onLikedItem = (id) => {
    const updatedQuotes = [...quotes];
    const index = updatedQuotes.findIndex((item) => item.id === id);
    updatedQuotes[index].liked = !updatedQuotes[index].liked;
    setQuotes(updatedQuotes);
  };

  const onSortItemValue = (e) => {
    const sortingValue = e.target.value;
    let sortedQuotes = [...quotes];
    if (sortingValue === "Random") {
      sortedQuotes = sortedQuotes.sort(() => Math.random() - 0.5);
    } else {
      sortedQuotes = sortedQuotes.sort((a, b) => {
        return a.character.localeCompare(b.character);
      });
      if (sortingValue === "Desc") {
        sortedQuotes.reverse();
      }
    }
    setQuotes(sortedQuotes);
  };

  const numberOfLikedQuotes =
    quotes && quotes.filter((quote) => quote.liked).length;

  const filteredQuotes = quotes
    ? quotes.filter((quote) => {
        return quote.character
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      })
    : null;

  if (!quotes) {
    return <p>Loading ...</p>;
  }
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
            onInput={onSearchInput}
          />
          <p> {errors && errors.name} </p>
          <select onChange={onSortItemValue} className="select">
            <option value="Random">Random</option>
            <option value="Asc">A-Z</option>
            <option value="Desc">Z-A</option>
          </select>
        </div>
        <h3 className="">Number of Liked quotes: {numberOfLikedQuotes}</h3>
      </header>

      <CharacterContainer
        quotes={filteredQuotes.length ? filteredQuotes : quotes}
        onDeleteItem={onDeleteItem}
        onLikedItem={onLikedItem}
      />
    </>
  );
};

export default App;
