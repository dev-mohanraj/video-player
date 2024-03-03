import { useEffect, useState } from "react";

import { MOCK_VIDEOS_INFO } from "./mocks";
import { Content, Footer, Header } from "./pages/index.jsx";

function VideoPlaylist() {
  const [filterData, setFilterData] = useState(MOCK_VIDEOS_INFO);

  useEffect(function init() {
    setFilterData(MOCK_VIDEOS_INFO);
  }, []);

  const onSearch = (searchTerm) => {
    if (searchTerm) {
      let updatedData = filterData.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilterData(updatedData);
    } else {
      setFilterData(MOCK_VIDEOS_INFO);
    }
  };

  const onUpdateFilterData = (data) => {
    setFilterData(data);
  };

  return (
    <div className={"h-screen flex flex-col justify-between"}>
      <Header onSearch={onSearch} />
      <Content
        filterData={filterData}
        onFilterOrderChange={onUpdateFilterData}
      />
      <Footer />
    </div>
  );
}

export default VideoPlaylist;
