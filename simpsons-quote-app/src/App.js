import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import UserInterface from "./ components/UserInterface";

class App extends Component {
  state = {};
  async componentDidMount() {
    const { data } = await axios.get(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=100`
    );
    this.setState({ quotes: data });
  }
  render() {
    console.log(this.state);
    if (!this.state.quotes) {
      return <p>Loading...</p>;
    }
    return (
      <>
        <UserInterface data={this.state} />
      </>
    );
  }
}

export default App;
