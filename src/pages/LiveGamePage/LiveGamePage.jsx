import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";

import TaggingForm from "../../components/TaggingForm/TaggingForm";
import YouTubeVideo from "../../components/YouTubeVideo/YouTubeVideo";

import styles from "./LiveGamePage.module.css";

const LiveGamePage = () => {
  const { gameId } = useParams();
  const [tags, setTags] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const playerRef = useRef(null);

  const handleStartGame = () => {
    const now = new Date();
    setGameStarted(true);
    setStartTime(now);
  };

  const handleSaveTag = (team, tag) => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      const minutes = Math.floor(currentTime / 60);
      const seconds = Math.floor(currentTime % 60);

      const newTag = {
        id: tags.length + 1,
        time: `${minutes}:${seconds}`,
        team,
        tag,
      };

      setTags([...tags, newTag]);
    } else {
      console.error("Player is not ready yet.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Game {gameId}</h2>
      {!gameStarted && (
        <button onClick={handleStartGame} className={styles.button}>
          Start Game
        </button>
      )}
      {gameStarted && (
        <>
          <p>Game started at: {startTime.toLocaleTimeString()}</p>
          <YouTubeVideo videoId="JgVxiYyIBiU" ref={playerRef} />
          <TaggingForm onSaveTag={handleSaveTag} />
          <ul className={styles.tagList}>
            {tags.map((tag) => (
              <li key={tag.id}>
                Time: {tag.time} - Team: {tag.team} Tag: {tag.tag}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default LiveGamePage;
