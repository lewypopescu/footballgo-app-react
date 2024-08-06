import React, { useState } from "react";
import { useParams } from "react-router-dom";

import TaggingForm from "../../components/TaggingForm/TaggingForm";

import styles from "./LiveGamePage.module.css";

const LiveGamePage = () => {
  const { gameId } = useParams();
  const [tags, setTags] = useState([]);

  const handleSaveTag = (tag, team) => {
    const newTag = {
      id: tags.length + 1,
      time: new Date().toLocaleTimeString(),
      tag,
      team,
    };
    setTags([...tags, newTag]);
  };

  return (
    <div className={styles.container}>
      <h2>Game {gameId}</h2>
      <TaggingForm onSaveTag={handleSaveTag} />
      <ul className={styles.tagList}>
        {tags.map((tag) => (
          <li key={tag.id}>{`${tag.time} - ${tag.tag} (${tag.team})`}</li>
        ))}
      </ul>
    </div>
  );
};

export default LiveGamePage;
