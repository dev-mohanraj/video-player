import PropTypes from "prop-types";

export const VideoPlayer = ({ source }) => {
  return (
    <video className="w-full h-6/7" controls muted playsInline>
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
