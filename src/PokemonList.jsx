import React, { useState, useEffect } from "react";

const PokemonList = ({ pokemonList, onPokemonSelect }) => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    Promise.all(
      pokemonList.map((pokemon) => fetch(pokemon.url).then((res) => res.json()))
    )
      .then((data) => setPokemonData(data))
      .catch((error) => console.error("Error fetching Pokémon data:", error));
  }, [pokemonList]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-6 overflow-y-auto h-[670px] sm:h-[450px] bg-gradient-to-b from-yellow-200 to-blue-100 rounded-lg shadow-xl">
      {pokemonData.map((pokemon) => (
        <div
          key={pokemon.name}
          className="pokemon-card bg-gradient-to-br from-blue-100 to-white rounded-xl shadow-lg flex flex-col items-center justify-center p-3 h-38 w-38 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-tr hover:from-blue-100 hover:to-white relative border-2 border-yellow-300 hover:border-yellow-00 group"
          onClick={() => onPokemonSelect(pokemon)}
        >
          <div className="relative w-24 h-24 mb-3 flex-shrink-0">
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-200"
            />
          </div>
          <span className="text-md font-medium text-gray-800 capitalize group-hover:text-blue-700 transition-all duration-300">
            {pokemon.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
