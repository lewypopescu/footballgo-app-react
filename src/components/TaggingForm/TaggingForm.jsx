import React, { useState } from "react";

import styles from "./TaggingForm.module.css";

const TaggingForm = ({ onSaveTag, teams }) => {
  const [team, setTeam] = useState(teams[0]);
  const [tag, setTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveTag(team, tag);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <select
        value={team}
        onChange={(e) => setTeam(e.target.value)}
        className={styles.input}
      >
        {teams.map((teamName) => (
          <option key={teamName} value={teamName}>
            {teamName}
          </option>
        ))}
      </select>
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
