import PropTypes from "prop-types";

import { Search } from "../components";

export const Header = ({ onSearch }) => {
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