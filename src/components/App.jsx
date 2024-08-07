import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage/HomePage";
import LiveGamePage from "../pages/LiveGamePage/LiveGamePage";
import LoginPage from "../pages/LoginPage/LoginPage";

import GlobalStyle from "../styles/GlobalStyle";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <>
      <GlobalStyle />
      <Routes>
        {!user ? (
          <Route path="/" element={<LoginPage setUser={setUser} />} />
        ) : (
          <>
            <Route path="/" element={<HomePage username={user} />} />
            <Route path="/game/:gameId" element={<LiveGamePage />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
