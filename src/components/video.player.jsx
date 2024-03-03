import PropTypes from "prop-types";

export const VideoPlayer = ({ source }) => {
  return (
    <video className="w-full md:h-6/7" controls muted playsInline autoPlay>
      <source src={source} type="video/mp4" />
    </video>
  );
};

VideoPlayer.propTypes = {
  source: PropTypes.string.isRequired,
};

VideoPlayer.defaultProps = {
  source: "",
};
