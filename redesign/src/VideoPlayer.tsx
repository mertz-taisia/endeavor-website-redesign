import React, { useRef, useEffect } from 'react';

type VideoPlayerProps = {
  videoSrc: string;
  height?: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, height = "500px" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play video on component mount and ensure it keeps playing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Function to force the video to play
    const forcePlay = () => {
      video.play().catch(err => {
        console.error("Error playing video:", err);
        // Retry play after a short delay if it fails
        setTimeout(forcePlay, 1000);
      });
    };

    // Start playing as soon as metadata is loaded
    video.addEventListener('loadedmetadata', forcePlay);
    
    // Keep trying to play if the video is paused for any reason
    video.addEventListener('pause', forcePlay);
    
    // Cleanup event listeners on unmount
    return () => {
      video.removeEventListener('loadedmetadata', forcePlay);
      video.removeEventListener('pause', forcePlay);
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-black" style={{ height }}>
      <video
        ref={videoRef}
        className="w-[220vw] h-full object-cover"
        loop
        muted
        playsInline
        autoPlay
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        style={{ pointerEvents: 'none' }} // Prevents any mouse interaction
      >
        <source src={videoSrc} type="video/quicktime" />
        <source src={videoSrc} type="video/mp4" /> {/* Fallback format */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
