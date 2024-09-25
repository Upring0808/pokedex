import React from "react";

const SearchBar = ({ onSearchChange }) => {
  const onInputChange = (e) => {
    onSearchChange(e.target.value);
  };
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search Pokémon..."
        onChange={onInputChange}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
