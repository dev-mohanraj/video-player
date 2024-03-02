import PropTypes from "prop-types";

export const VideoCard = ({ sources, title, description, onClick }) => {
  return (
    <div
      className="card p-2 flex overflow-hidden gap-4 border rounded h-32 m-2 cursor-pointer"
      style={{ height: "8rem" }}
      onClick={onClick}
    >
      <div className="w-48 flex flex-col justify-center">
        <video preload="metadata" className="max-w-none rounded-md">
          <source src={`${sources}#t=1`} />
        </video>
      </div>
      <div className="flex flex-col gap-2 overflow-hidden">
        <label className="font-bold">{title}</label>
        <div className="font-light line-clamp-3">{description}</div>
      </div>
    </div>
  );
};

VideoCard.propTypes = {
  sources: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
};
