import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage/HomePage";
import LiveGamePage from "../pages/LiveGamePage/LiveGamePage";

import GlobalStyle from "../styles/GlobalStyle";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:gameId" element={<LiveGamePage />} />
      </Routes>
    </>
  );
};

export default App;
