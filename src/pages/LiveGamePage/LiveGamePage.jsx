import React, { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import YouTubeVideo from "../../components/YouTubeVideo/YouTubeVideo";
import TaggingForm from "../../components/TaggingForm/TaggingForm";
import { setGameTags, setGameCurrentTime } from "../../store/gameSlice";

import styles from "./LiveGamePage.module.css";

const LiveGamePage = () => {
  const { gameId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const videoId = new URLSearchParams(location.search).get("videoId");
  const clubName =
    new URLSearchParams(location.search).get("clubName") || "Default Club Name";
  const teams = useMemo(() => {
    return new URLSearchParams(location.search).get("teams")?.split(",") || [];
  }, [location.search]);
  const [tags, setTags] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.game.games[gameId]);

  useEffect(() => {
    if (!videoId || !teams) {
      console.error("videoId or teams not found in URL");
    }
  }, [videoId, teams]);

  useEffect(() => {
    if (gameState?.tags) {
      setTags(gameState.tags);
    }

    if (gameState?.currentTime && playerRef.current) {
      playerRef.current.seekTo(parseFloat(gameState.currentTime), true);
    }
  }, [gameState?.tags, gameState?.currentTime]);

  const handleStartGame = () => {
    const now = new Date();
    setGameStarted(true);
    setStartTime(now);
    if (playerRef.current && playerRef.current.playVideo) {
      playerRef.current.playVideo();
    }
  };

  const handleSaveTag = (team, tag) => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      const minutes = Math.floor(currentTime / 60);
      const seconds = Math.floor(currentTime % 60);

      const newTag = {
        id: (gameState?.tags?.length || 0) + 1,
        time: `${minutes}:${seconds}`,
        team,
        tag,
      };

      const updatedTags = [...(gameState?.tags || []), newTag];
      setTags(updatedTags);
      dispatch(setGameTags({ gameId, tags: updatedTags }));
      dispatch(setGameCurrentTime({ gameId, currentTime }));
    } else {
      console.error("Player is not ready yet.");
    }
  };

  const handleBack = () => {
    if (playerRef.current && playerRef.current.getCurrentTime) {
      const currentTime = playerRef.current.getCurrentTime();
      dispatch(setGameCurrentTime({ gameId, currentTime }));
    }
    navigate(-1);
  };

  const handleDeleteTag = (tagId) => {
    const updatedTags = tags.filter((tag) => tag.id !== tagId);
    setTags(updatedTags);
    dispatch(setGameTags({ gameId, tags: updatedTags }));
  };

  return (
    <div className={styles.container}>
      <button onClick={handleBack} className={styles.backButton}>
        Back
      </button>
      <h2>{clubName || "Game"}</h2>
      <button onClick={handleStartGame} className={styles.button}>
        Start Game
      </button>
      {gameStarted && <p>Game started at: {startTime.toLocaleTimeString()}</p>}
      {gameStarted && (
        <div className={styles.videoContainer}>
          <YouTubeVideo videoId={videoId} ref={playerRef} />
        </div>
      )}
      {gameStarted && (
        <div className={styles.taggingContainer}>
          <TaggingForm onSaveTag={handleSaveTag} teams={teams} />
          <h3 className={styles.tags}>Tags</h3>
          <table className={styles.tagTable}>
            <thead>
              <tr>
                <th className="time">Time</th>
                <th className="team">Team</th>
                <th className="tag">Tag</th>
                <th className="delete">Action</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag) => (
                <tr key={tag.id}>
                  <td className="time">{tag.time}</td>
                  <td className="team">{tag.team}</td>
                  <td className="tag">{tag.tag}</td>
                  <td className="delete">
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteTag(tag.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LiveGamePage;
