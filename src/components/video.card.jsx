import PropTypes from "prop-types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const VideoCard = ({
  sources,
  title,
  description,
  onClick,
  activeItem,
  id,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div
        id="card"
        onClick={onClick}
        className={`card p-2 flex overflow-hidden gap-4 border rounded h-32 m-2 cursor-pointer ${
          activeItem === id
            ? "bg-gray-300"
            : "hover:bg-gray-100 hover:shadow-md"
        }`}
        style={{ height: "8rem" }}
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
    </div>
  );
};

VideoCard.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
  sources: PropTypes.string,
  activeItem: PropTypes.string,
  description: PropTypes.string,
};
