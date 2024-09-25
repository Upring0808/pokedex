import React from "react";

const SearchBar = ({ onSearchChange }) => {
  const onInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="w-full flex justify-center mb-6">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <div className="w-5 h-5 bg-gradient-to-b from-white to-gray-200 rounded-full border-2 border-gray-400"></div>
        </div>

        <input
          type="text"
          placeholder="Search Pokémon..."
          onChange={onInputChange}
          className="w-full pl-10 pr-4 py-3 rounded-full bg-gradient-to-br from-white to-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition-shadow duration-200"
        />

        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <button
            type="button"
            className="w-7 h-7 bg-gradient-to-b from-white to-red-400 rounded-full border-2 border-red-300 hover:shadow-md transition-all duration-200"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
