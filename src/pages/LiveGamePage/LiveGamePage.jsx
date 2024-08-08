import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setGameTags, setGameCurrentTime } from "../../store/gameSlice";
import TaggingForm from "../../components/TaggingForm/TaggingForm";
import YouTubeVideo from "../../components/YouTubeVideo/YouTubeVideo";
import styles from "./LiveGamePage.module.css";

const LiveGamePage = () => {
  const { gameId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const videoId = new URLSearchParams(location.search).get("videoId");
  const [tags, setTags] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.game.games[gameId]);

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
      dispatch(setGameTags({ gameId, tags: updatedTags }));
      dispatch(setGameCurrentTime({ gameId, currentTime }));
    } else {
      console.error("Player is not ready yet.");
    }
  };

  useEffect(() => {
    if (gameState?.tags) {
      setTags(gameState.tags);
    }

    if (gameState?.currentTime && playerRef.current) {
      playerRef.current.seekTo(parseFloat(gameState.currentTime), true);
    }
  }, [gameState?.tags, gameState?.currentTime]);

  const handleBack = () => {
    if (playerRef.current && playerRef.current.getCurrentTime) {
      const currentTime = playerRef.current.getCurrentTime();
      dispatch(setGameCurrentTime({ gameId, currentTime }));
    }
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <button onClick={handleBack} className={styles.button}>
        Back
      </button>
      <h2>Game {gameId}</h2>
      {gameStarted && <p>Game started at: {startTime.toLocaleTimeString()}</p>}
      {!gameStarted && (
        <button onClick={handleStartGame} className={styles.button}>
          Start Game
        </button>
      )}
      {gameStarted && (
        <div className={styles.videoContainer}>
          <YouTubeVideo videoId={videoId} ref={playerRef} />
        </div>
      )}
      {gameStarted && (
        <div className={styles.taggingContainer}>
          <TaggingForm onSaveTag={handleSaveTag} />
          <h3>Tags</h3>
          <table className={styles.tagTable}>
            <thead>
              <tr>
                <th>Time</th>
                <th>Team</th>
                <th>Tag</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag) => (
                <tr key={tag.id}>
                  <td>{tag.time}</td>
                  <td>{tag.team}</td>
                  <td>{tag.tag}</td>
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
