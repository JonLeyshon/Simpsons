import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [quotes, setQuotes] = useState();

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

  return (
    <>
      <p> Hello</p>
    </>
  );
};
