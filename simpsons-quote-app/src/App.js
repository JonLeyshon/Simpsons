import React, { useState, useEffect } from "react";
import axios from "axios";
import UserSearch from "./ components/UserSearch";
import CharacterContainer from "./ components/CharacterContainer";
import "bulma/css/bulma.css";
import "./App.css";
import Joi from "joi";

const App = () => {
  const [quotes, setQuotes] = useState();
  const [searchInput, setSearchInput] = useState();
  const [likedTotal, setLikedToatl] = useState(0);
  const [listOrder, setListOrder] = useState("Random");
  const [errors, setErrors] = useState(null);

  const onSearchInput = async (e) => {
    setSearchInput(e.target.value);
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

  // const onDeleteItem = (id) => {
  //   const quotes = [...quotes];
  //   const index = quotes.findIndex((item) => item.id === id);
  //   quotes.splice(index, 1);
  //   setQuotes(quotes);
  // };

  const filteredArray = quotes.filter((quote) => {
    return quote.character
      .toLowerCase()
      .includes(this.state.searchInput.toLowerCase());
  });

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
          {/* <p> {errors && errors.name} </p> */}
          {/* <select onChange={this.onSortItemValue} className="select">
            <option value="Random">Random</option>
            <option value="Asc">A-Z</option>
            <option value="Desc">Z-A</option>
          </select> */}
        </div>
        <h3 className="">{`Number of Liked quotes: ${likedTotal}`}</h3>
      </header>

      <CharacterContainer
        quotes={filteredArray.length ? filteredArray : quotes}
        // onDeleteItem={onDeleteItem}
        // onLikedItem={this.onLikedItem}
        // likedTotal={this.state.likedTotal}
      />
    </>
  );
};

export default App;

// class App extends Component {
//   state = { searchInput: "", likedTotal: 0, listOrder: "random" };

//   schema = { name: Joi.string().min(2).max(20) };

//   onSearchInput = async (e) => {
//     let searchInput = { ...this.state.searchInput };
//     searchInput = e.target.value;

//     this.setState({ searchInput });

//     const _joiInstance = Joi.object(this.schema);

//     try {
//       await _joiInstance.validateAsync({ name: searchInput });
//       this.setState({ errors: null });
//     } catch (e) {
//       const errorsMod = {};
//       e.details.forEach((error) => {
//         errorsMod[error.context.key] = error.message;
//       });
//       this.setState({ errors: errorsMod });
//     }
//   };

//   async componentDidMount() {
//     const { data } = await axios.get(
//       `https://thesimpsonsquoteapi.glitch.me/quotes?count=100`
//     );
//     data.forEach((item) => {
//       item.id = Math.round(Math.random() * 10000000);
//       item.liked = false;
//     });
//     this.setState({ quotes: data });
//   }

//   onDeleteItem = (id) => {
//     const quotes = [...this.state.quotes];
//     const index = quotes.findIndex((item) => item.id === id);
//     quotes.splice(index, 1);
//     this.setState({ quotes: quotes });
//   };

//   onLikedItem = (id) => {
//     const quotes = [...this.state.quotes];
//     const index = quotes.findIndex((item) => item.id === id);
//     quotes[index].liked = !quotes[index].liked;
//     this.setState({ quotes: quotes });
//   };

//   onSortItemValue = (e) => {
//     // this.setState({ listOrder: e.target.value });
//     const sortingValue = e.target.value;
//     const quotes = [...this.state.quotes];
//     let sortedQuotes = [...quotes];
//     if (sortingValue === "Random") {
//       sortedQuotes = quotes.sort(() => Math.random() - 0.5);
//     } else {
//       sortedQuotes = quotes.sort((a, b) => {
//         return a.character.localeCompare(b.character);
//       });
//       if (sortingValue === "Desc") {
//         sortedQuotes.reverse();
//       }
//     }
//     this.setState({ quotes: sortedQuotes });
//   };

//   render() {
//     console.log(this.state);
//     if (!this.state.quotes) {
//       return <p>Loading ...</p>;
//     }
//     const filteredArray = this.state.quotes.filter((quote) => {
//       return quote.character
//         .toLowerCase()
//         .includes(this.state.searchInput.toLowerCase());
//     });

//     const numberOfLikedQuotes = this.state.quotes.filter(
//       (quote) => quote.liked
//     ).length;

//     return (
//       <>
//         <header className="is-flex is-centered">
//           <img src="https://ch12-thesimpsons.netlify.app/static/media/simpsons.5ec25fe774cfe1a5641fb30ba7ad1292.svg" />
//           <div className="inputContainer">
//             <input
//               type="text"
//               placeholder="Search your Character"
//               id="name"
//               name="name"
//               className="input is-warning is-medium"
//               onInput={this.onSearchInput}
//             />
//             <p> {this.state.errors && this.state.errors.name} </p>
//             <select onChange={this.onSortItemValue} className="select">
//               <option value="Random">Random</option>
//               <option value="Asc">A-Z</option>
//               <option value="Desc">Z-A</option>
//             </select>
//           </div>
//           <h3 className="">
//             {`Number of Liked quotes: ${numberOfLikedQuotes}`}
//           </h3>
//         </header>

//         <CharacterContainer
//           quotes={filteredArray.length ? filteredArray : this.state.quotes}
//           onDeleteItem={this.onDeleteItem}
//           onLikedItem={this.onLikedItem}
//           likedTotal={this.state.likedTotal}
//         />
//       </>
//     );
//   }
// }

// export default App;
