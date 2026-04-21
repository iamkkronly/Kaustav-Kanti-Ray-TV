import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ url, title, onClose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    let hls;
    if (url && videoRef.current) {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current.play().catch(e => console.error("Error playing video:", e));
        });
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = url;
        videoRef.current.addEventListener('loadedmetadata', () => {
          videoRef.current.play().catch(e => console.error("Error playing video:", e));
        });
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [url]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">
      <div className="relative w-full max-w-4xl bg-black">
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black to-transparent flex justify-between items-center text-white z-10">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>
        <video
          ref={videoRef}
          className="w-full aspect-video"
          controls
          autoPlay
        />
        <div className="p-4 text-gray-400 text-sm flex justify-between">
            <span>Developer :- Kaustav Kanti Ray @iamkkronly</span>
            <span>Playing live content</span>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
