import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TaggingForm from "../../components/TaggingForm/TaggingForm";
import styles from "./LiveGamePage.module.css";

const LiveGamePage = () => {
  const { gameId } = useParams();
  const [tags, setTags] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const handleStartGame = () => {
    setGameStarted(true);
    setStartTime(new Date());
  };

  const handleSaveTag = (tag, team) => {
    const currentTime = new Date();
    const timeElapsed = Math.floor((currentTime - startTime) / 60000);
    const newTag = {
      id: tags.length + 1,
      time: timeElapsed,
      tag,
      team,
    };
    setTags([...tags, newTag]);
  };

  return (
    <div className={styles.container}>
      <h2>Game {gameId}</h2>
      {!gameStarted && (
        <button onClick={handleStartGame} className={styles.button}>
          Start Game
        </button>
      )}
      {gameStarted && <TaggingForm onSaveTag={handleSaveTag} />}
      <ul className={styles.tagList}>
        {tags.map((tag) => (
          <li key={tag.id}>{`${tag.time}’ - ${tag.tag} (${tag.team})`}</li>
        ))}
      </ul>
    </div>
  );
};

export default LiveGamePage;
