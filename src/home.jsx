import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { MOCK_VIDEOS_INFO } from "./mocks";

import { Search, VideoCard, VideoPlayer } from "./components";

const Header = ({ onSearch }) => {
  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">Video playlist</h1>
      <Search onSearch={onSearch} />
    </header>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func,
};

const VideoInfo = ({ currentVideo }) => {
  const { title, description, subtitle } = currentVideo;
  return (
    <div className="bg-gray-600 text-white p-4 flex flex-col gap-4 h-full">
      <div>
        Movie Name :{" "}
        <span className="font-thin">
          {title} ({subtitle})
        </span>
      </div>
      <div>
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

const Content = ({ filterData }) => {
  const [currentVideo, setCurrentVideo] = useState(MOCK_VIDEOS_INFO[0]);

  useEffect(function init() {
    setCurrentVideo(MOCK_VIDEOS_INFO[0]);
  }, []);

  return (
    <section className="flex justify-between h-full w-full overflow-hidden">
      <div className="h-full w-3/5">
        <VideoPlayer source={currentVideo.sources} />
        <VideoInfo currentVideo={currentVideo} />
      </div>
      <div className="h-full w-2/5 overflow-y-auto gap-2 shadow-lg">
        {filterData.length > 0 ? (
          filterData.map((item) => (
            <VideoCard
              key={item.id}
              onClick={() => {
                setCurrentVideo(item);
              }}
              activeItem={currentVideo.id}
              {...item}
            />
          ))
        ) : (
          <div className="w-full flex h-screen justify-center items-center">
            No results
          </div>
        )}
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
};

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>
        &copy; {new Date().getFullYear()} video playlist by mohanraj
        venkatachalam. All rights reserved.
      </p>
    </footer>
  );
};

function VideoPlaylist() {
  const [filterData, setFilterData] = useState(MOCK_VIDEOS_INFO);

  const onSearch = (searchTerm) => {
    let filterData = MOCK_VIDEOS_INFO.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilterData(filterData);
  };

  return (
    <div className={"h-screen flex flex-col justify-between"}>
      <Header onSearch={onSearch} />
      <Content filterData={filterData} />
      <Footer />
    </div>
  );
}

export default VideoPlaylist;
