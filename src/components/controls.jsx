import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Show } from "./Show.jsx";
import { formatTime } from "../utils.js";

import Play from "../icons/play.svg?react";
import Pause from "../icons/pause.svg?react";
import Mute from "../icons/mute.svg?react";
import Volume from "../icons/volume.svg?react";
import Expand from "../icons/expand.svg?react";

export const CustomControls = ({ videoRef }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(function init() {
    let video = videoRef.current;

    let updateTime = () => {
      setCurrentTime(video.currentTime);
      setTotalTime(video.duration);
    };

    let handleMetadata = () => {
      setTotalTime(video.duration);
    };

    let handleFullScreen = () => {
      setIsFullScreen(document.fullscreenElement !== null);
    };

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", handleMetadata);
    video.addEventListener("fullscreenchange", handleFullScreen);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", handleMetadata);
      video.removeEventListener("fullscreenchange", handleFullScreen);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSeek = (event) => {
    let timeToSeek = event.target.value;
    setCurrentTime(timeToSeek);
    videoRef.current.currentTime = timeToSeek;
  };

  return (
    <div className="absolute bg-gray-200 bg-opacity-50 p-1 flex flex-col items-center bottom-0 w-full space-2">
      <div className="w-full h-full hover:block">
        <Seeker
          handleSeek={handleSeek}
          currentTime={currentTime}
          totalTime={totalTime}
        />
      </div>
      <div className="flex items-center bottom-0 w-full gap-4">
        <div className="flex items-center bottom-0 w-full gap-4">
          <PlayPause videoRef={videoRef} />
          <Timer currentTime={currentTime} totalTime={totalTime} />
          <VolumeControl videoRef={videoRef} />
        </div>
        <div className="flex items-center w-full gap-4 justify-end">
          <PlayBackSpeed videoRef={videoRef} />
          <FullScreen videoRef={videoRef} isFullScreen={isFullScreen} />
        </div>
      </div>
    </div>
  );
};

CustomControls.propTypes = {
  videoRef: PropTypes.element,
};

const Timer = memo(function TimerComponent({ currentTime, totalTime }) {
  return (
    <div className="min-w-20">
      <label className="text-sky-950">
        {`${formatTime(currentTime)}/${formatTime(totalTime)}`}
      </label>
    </div>
  );
});

Timer.propTypes = {
  currentTime: PropTypes.number,
  totalTime: PropTypes.number,
};

const Seeker = ({ handleSeek, currentTime, totalTime }) => {
  return (
    <input
      min={0}
      max={totalTime}
      type="range"
      value={currentTime}
      onChange={handleSeek}
      style={{
        background: "linear-gradient(to right, #3182ce, #63b3ed)",
      }}
      className="appearance-none w-full h-1 bg-gray-200 rounded-lg outline-none"
    />
  );
};

Seeker.propTypes = {
  handleSeek: PropTypes.func,
  totalTime: PropTypes.number,
  currentTime: PropTypes.number,
};

const PlayPause = ({ videoRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="text-white w-4 h-full ml-2" onClick={togglePlayPause}>
      <Show when={isPlaying}>
        <Pause />
      </Show>
      <Show when={!isPlaying}>
        <Play />
      </Show>
    </div>
  );
};

PlayPause.propTypes = {
  videoRef: PropTypes.shape({ current: PropTypes.object }),
};

const PlayBackSpeed = ({ videoRef }) => {
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const handleSpeedChange = (event) => {
    setPlaybackSpeed(event.target.value);
    videoRef.current.playbackRate = event.target.value;
  };

  return (
    <select
      className="text-sm h-8 px-2 border border-gray-300 rounded bg-white text-gray-700 h-10 w-18"
      value={playbackSpeed}
      onChange={handleSpeedChange}
    >
      <option value={0.5}>0.5x</option>
      <option value={1}>1x</option>
      <option value={1.5}>1.5x</option>
      <option value={2}>2x</option>
    </select>
  );
};

PlayBackSpeed.propTypes = {
  videoRef: PropTypes.shape({ current: PropTypes.object }),
};

const VolumeControl = ({ videoRef }) => {
  const [volume, setVolume] = useState(100);

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);

    videoRef.current.volume = newVolume / 100;
  };

  const handleMute = () => {
    let newVolume = 0;
    setVolume(newVolume);
    videoRef.current.volume = newVolume / 100;
  };

  const handleUnMute = () => {
    let newVolume = 100;
    setVolume(newVolume);
    videoRef.current.volume = newVolume / 100;
  };

  return (
    <div className="flex items-center w-32">
      <div className="w-8 h-full mr-2">
        <Show when={volume > 0}>
          <span onClick={handleMute}>
            <Volume />
          </span>
        </Show>
        <Show when={volume === 0}>
          <span>
            <Mute onClick={handleUnMute} />
          </span>
        </Show>
      </div>
      <input
        min="0"
        max="100"
        type="range"
        value={volume}
        onChange={handleVolumeChange}
        style={{
          background: "linear-gradient(to right, #3182ce, #63b3ed)",
        }}
        className="appearance-none w-full h-2 bg-gray-200 rounded-lg outline-none"
      />
    </div>
  );
};

VolumeControl.propTypes = {
  videoRef: PropTypes.shape({ current: PropTypes.object }),
};

const FullScreen = ({ videoRef, isFullScreen }) => {
  const toggleFullScreen = () => {
    const video = videoRef.current;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  };

  return (
    <div className="text-white w-4 h-full ml-2" onClick={toggleFullScreen}>
      <Show when={!isFullScreen}>
        <Expand />
      </Show>
    </div>
  );
};

FullScreen.propTypes = {
  videoRef: PropTypes.shape({ current: PropTypes.object }),
  isFullScreen: PropTypes.bool,
};
