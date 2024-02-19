import React from "react";
import UserInterface from "./ components/UserInterface";
import { Routes, Route } from "react-router-dom";
import About from "./ components/About";
import Contact from "./ components/Contact";
import Nav from "./ components/Nav";

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="*" element={<UserInterface />} />
        <Route path="/about" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default App;
