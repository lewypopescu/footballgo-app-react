import React from "react";

import styles from "./LiveGameItem.module.css";

const LiveGameItem = ({ clubName, startTime, onEnterDugout }) => {
  return (
    <div className={styles.gameItem}>
      <h2>{clubName}</h2>
      <p>Start time: {startTime}</p>
      <button onClick={onEnterDugout} className={styles.button}>
        Enter Dugout
      </button>
    </div>
  );
};

export default LiveGameItem;
