import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Show, VideoCard, VideoPlayer } from "../components";

const VideoInfo = ({ currentVideo }) => {
  const { title, description, subtitle } = currentVideo;
  return (
    <div className="bg-gray-600 text-white p-4 flex flex-col gap-4 height-auto md:h-full">
      <div>
        Movie Name :{" "}
        <span className="font-thin">
          {title} ({subtitle})
        </span>
      </div>
      <div className="md:block hidden">
        Description : <span className="font-thin">{description}</span>
      </div>
    </div>
  );
};

VideoInfo.propTypes = {
  currentVideo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
  }),
};

export const Content = ({ filterData, onFilterOrderChange }) => {
  const [currentVideo, setCurrentVideo] = useState(filterData[0]);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = active.data.current.sortable.index;
      const newIndex = over.data.current.sortable.index;
      const updatedItem = arrayMove(filterData, oldIndex, newIndex);
      onFilterOrderChange(updatedItem);
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <section className="flex md:flex-row flex-col justify-between h-full md:w-full w-screen md:overflow-hidden overflow-auto mobile-layout">
      <div className="md:h-full md:w-3/5 w-full">
        <VideoPlayer
          key={currentVideo?.sources}
          source={currentVideo?.sources}
        />
        <VideoInfo currentVideo={currentVideo} />
      </div>
      <div className="h-full md:w-2/5 w-full overflow-y-auto gap-2 shadow-lg">
        <Show when={filterData.length > 0}>
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext
              items={filterData}
              strategy={verticalListSortingStrategy}
            >
              {filterData.map((item) => (
                <VideoCard
                  onClick={() => {
                    setCurrentVideo(item);
                  }}
                  key={item.id}
                  activeItem={currentVideo.id}
                  {...item}
                />
              ))}
            </SortableContext>
          </DndContext>
        </Show>
        <Show when={filterData.length === 0}>
          <div className="md:w-full flex md:h-screen mt-10 justify-center items-center">
            No results
          </div>
        </Show>
      </div>
    </section>
  );
};

Content.propTypes = {
  filterData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
  onFilterOrderChange: PropTypes.func,
};
