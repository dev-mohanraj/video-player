import { useEffect, useState } from "react";

import { MOCK_VIDEOS_INFO } from "./mocks";

import { VideoPlayer } from "./components";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold">Video playlist</h1>
    </header>
  );
};

const VideoInfo = ({ currentVideo }) => {
  const { title, description } = currentVideo;
  return (
    <div>
      <title>{title}</title>
      <text>{description}</text>
    </div>
  );
};

const Content = () => {
  const [currentVideo, setCurrentVideo] = useState(MOCK_VIDEOS_INFO[0]);

  useEffect(function init() {
    setCurrentVideo(MOCK_VIDEOS_INFO[0]);
  }, []);

  return (
    <section className="flex justify-between h-full w-full">
      <div className="h-full w-3/4">
        <VideoPlayer source={currentVideo.sources} />
        <VideoInfo currentVideo={currentVideo} />
      </div>
      <div className="h-full w-1/4">video list</div>
    </section>
  );
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
  return (
    <div className={"h-screen flex flex-col justify-between"}>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default VideoPlaylist;
