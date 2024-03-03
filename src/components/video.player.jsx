import { memo, useRef } from "react";
import PropTypes from "prop-types";
import { CustomControls } from "./controls";

function VideoPlayerComponent({ source }) {
  const videoRef = useRef(null);
  return (
    <div className="relative">
      <video ref={videoRef} className="w-full md:h-6/7" autoPlay>
        <source src={source} type="video/mp4" />
      </video>
      <CustomControls videoRef={videoRef} />
    </div>
  );
}

VideoPlayerComponent.propTypes = {
  source: PropTypes.string.isRequired,
};

VideoPlayerComponent.defaultProps = {
  source: "",
};

export const VideoPlayer = memo(VideoPlayerComponent);
