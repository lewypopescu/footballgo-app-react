import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import LiveGameItem from "../../components/LiveGameItem/LiveGameItem";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();
  const games = [
    {
      id: 1,
      clubName: "CLUB BRUGGE vs UNION SG",
      startTime: "16:00",
      videoId: "5XsrQNg7SiU",
    },
    {
      id: 2,
      clubName: "CLUB BRUGGE vs KRC GENK",
      startTime: "18:00",
      videoId: "XkC1ZaSK1BA",
    },
    {
      id: 3,
      clubName: "CLUB BRUGGE vs ROYAL ANTWERP FC",
      startTime: "20:00",
      videoId: "3kN3H8BMSyE",
    },
  ];

  const handleEnterDugout = (gameId, videoId) => {
    navigate(`/game/${gameId}?videoId=${videoId}`);
  };

  return (
    <div className={styles.container}>
      <Header username="mypitch App" />
      {games.map((game) => (
        <LiveGameItem
          key={game.id}
          clubName={game.clubName}
          startTime={game.startTime}
          onEnterDugout={() => handleEnterDugout(game.id, game.videoId)}
        />
      ))}
    </div>
  );
};

export default HomePage;
