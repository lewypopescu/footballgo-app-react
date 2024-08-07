import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

const YouTubeVideo = forwardRef(({ videoId }, ref) => {
  const playerRef = useRef(null);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    };

    loadYouTubeAPI();

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player(`youtube-player-${videoId}`, {
        videoId: videoId,
        events: {
          onReady: () => {
            console.log("Player ready");
          },
        },
      });
    };
  }, [videoId]);

  useImperativeHandle(ref, () => ({
    getCurrentTime: () => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        return playerRef.current.getCurrentTime();
      }
      return null;
    },
  }));

  return (
    <div>
      <div id={`youtube-player-${videoId}`} />
    </div>
  );
});

export default YouTubeVideo;
