import { memo } from "react";
import PropTypes from "prop-types";

function VideoPlayerComponent({ source }) {
  return (
    <video className="w-full md:h-6/7" controls muted playsInline autoPlay>
      <source src={source} type="video/mp4" />
    </video>
  );
}

VideoPlayerComponent.propTypes = {
  source: PropTypes.string.isRequired,
};

VideoPlayerComponent.defaultProps = {
  source: "",
};


export const VideoPlayer = memo(VideoPlayerComponent);