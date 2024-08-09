import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import LiveGameItem from "../../components/LiveGameItem/LiveGameItem";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const username = useSelector((state) => state.user.username);
  const navigate = useNavigate();

  const games = [
    {
      id: 1,
      clubName: "CLUB BRUGGE vs UNION SG",
      startTime: "16:00",
      videoId: "5XsrQNg7SiU",
      teams: ["CLUB BRUGGE", "UNION SG"],
    },
    {
      id: 2,
      clubName: "CLUB BRUGGE vs KRC GENK",
      startTime: "18:00",
      videoId: "XkC1ZaSK1BA",
      teams: ["CLUB BRUGGE", "KRC GENK"],
    },
    {
      id: 3,
      clubName: "CLUB BRUGGE vs ROYAL ANTWERP FC",
      startTime: "20:00",
      videoId: "3kN3H8BMSyE",
      teams: ["CLUB BRUGGE", "ROYAL ANTWERP FC"],
    },
  ];

  const handleEnterDugout = (gameId, videoId, clubName, teams) => {
    navigate(
      `/game/${gameId}?videoId=${videoId}&clubName=${encodeURIComponent(
        clubName
      )}&teams=${encodeURIComponent(teams.join(","))}`
    );
  };

  const handleLogOut = () => {
    navigate(0);
  };

  return (
    <div className={styles.container}>
      <Header />
      <button onClick={handleLogOut} className={styles.logOutButton}>
        Log Out
      </button>
      <h1>Welcome, {username}!</h1>
      <div className={styles.gamesList}>
        {games.map((game) => (
          <div key={game.id} className={styles.gameItem}>
            <LiveGameItem
              clubName={game.clubName}
              startTime={game.startTime}
              onEnterDugout={() =>
                handleEnterDugout(
                  game.id,
                  game.videoId,
                  game.clubName,
                  game.teams
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
