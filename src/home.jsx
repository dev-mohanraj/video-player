import { useState } from "react";

import { MOCK_VIDEOS_INFO } from "./mocks";
import { Content, Footer, Header } from "./pages/index.jsx";

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
