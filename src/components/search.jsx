import { useState } from "react";
import PropTypes from "prop-types";

export const Search = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder={"Search"}
      value={searchValue}
      onChange={handleChange}
      className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 text-black"
    />
  );
};

Search.propTypes = {
  onSearch: PropTypes.func,
};

Search.defaultProps = {
  onSearch: () => {},
};
