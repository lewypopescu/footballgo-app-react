import React, { useState } from "react";
import styles from "./TaggingForm.module.css";

const TaggingForm = ({ onSaveTag }) => {
  const [team, setTeam] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveTag(team, tag);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Team"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Add tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Save Tag
      </button>
    </form>
  );
};

export default TaggingForm;
