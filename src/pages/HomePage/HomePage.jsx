import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import LiveGameItem from "../../components/LiveGameItem/LiveGameItem";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();
  const games = [
    { id: 1, clubName: "Club Brugge vs Union St.Gilloise", startTime: "14:00" },
    { id: 2, clubName: "Gent vs RSC Anderlecht", startTime: "15:00" },
    { id: 3, clubName: "Royal Antwerp FC vs KRC Genk", startTime: "16:00" },
  ];

  const handleEnterDugout = (gameId) => {
    navigate(`/game/${gameId}`);
  };

  return (
    <div className={styles.container}>
      <Header username="mypitch App" />
      {games.map((game) => (
        <LiveGameItem
          key={game.id}
          clubName={game.clubName}
          startTime={game.startTime}
          onEnterDugout={() => handleEnterDugout(game.id)}
        />
      ))}
    </div>
  );
};

export default HomePage;
