import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import styles from "./YouTubeVideo.module.css";

const YouTubeVideo = forwardRef(({ videoId }, ref) => {
  const playerRef = useRef(null);
  const playerReady = useRef(false);

  useImperativeHandle(ref, () => ({
    getCurrentTime: () => {
      if (playerReady.current && playerRef.current) {
        return playerRef.current.getCurrentTime();
      }
      return null;
    },
    seekTo: (seconds) => {
      if (playerReady.current && playerRef.current) {
        playerRef.current.seekTo(seconds, true);
      } else {
        console.error("Player is not ready or method is not available.");
      }
    },
    playVideo: () => {
      if (playerReady.current && playerRef.current) {
        playerRef.current.playVideo();
      } else {
        console.error("Player is not ready or method is not available.");
      }
    },
  }));

  useEffect(() => {
    const loadYouTubeAPI = () => {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    };

    const onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player(`youtube-player-${videoId}`, {
        videoId: videoId,
        events: {
          onReady: () => {
            console.log("Player ready");
            playerReady.current = true;
          },
        },
      });
    };

    if (!window.YT) {
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
      loadYouTubeAPI();
    } else {
      onYouTubeIframeAPIReady();
    }

    return () => {
      if (window.YT && playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  return (
    <div className={styles.videoWrapper}>
      <div id={`youtube-player-${videoId}`} className={styles.youtubePlayer} />
    </div>
  );
});

export default YouTubeVideo;
