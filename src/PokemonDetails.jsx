import React from "react";
import PokemonAttributes from "./PokemonAttributes";

const PokemonDetails = ({ pokemon }) => {
  const getTypeColor = (type) => {
    const colors = {
      normal: "bg-gray-400",
      fire: "bg-red-600",
      water: "bg-blue-600",
      electric: "bg-yellow-500",
      grass: "bg-green-600",
      ice: "bg-blue-400",
      fighting: "bg-red-700",
      poison: "bg-purple-600",
      ground: "bg-yellow-700",
      flying: "bg-indigo-500",
      psychic: "bg-pink-500",
      bug: "bg-green-500",
      rock: "bg-yellow-800",
      ghost: "bg-purple-700",
      dragon: "bg-indigo-700",
      dark: "bg-gray-800",
      steel: "bg-gray-600",
      fairy: "bg-pink-400",
    };
    return colors[type] || "bg-gray-400";
  };

  const getGlowColor = (type) => {
    const glowColors = {
      normal: "rgba(186, 170, 180, 0.5)",
      fire: "rgba(255, 83, 13, 0.4)",
      water: "rgba(30, 144, 255, 0.4)",
      electric: "rgba(255, 255, 0, 0.4)",
      grass: "rgba(34, 139, 34, 0.9)",
      ice: "rgba(173, 216, 230, 0.4)",
      fighting: "rgba(178, 34, 34, 0.4)",
      poison: "rgba(138, 43, 226, 0.5)",
      ground: "rgba(210, 180, 140, 0.4)",
      flying: "rgba(100, 149, 237, 0.6)",
      psychic: "rgba(255, 20, 147, 0.4)",
      bug: "rgba(50, 205, 50, 0.4)",
      rock: "rgba(139, 69, 19, 0.4)",
      ghost: "rgba(75, 0, 130, 0.4)",
      dragon: "rgba(72, 61, 139, 0.5)",
      dark: "rgba(47, 79, 79, 0.5)",
      steel: "rgba(169, 169, 169, 0.5 )",
      fairy: "rgba(255, 182, 193, 0.5)",
    };
    return glowColors[type] || "rgba(156, 163, 175, 0.4)";
  };

  const getGlowGradient = (types) => {
    if (types.length === 2) {
      const color1 = getGlowColor(types[0].type.name);
      const color2 = getGlowColor(types[1].type.name);
      return `linear-gradient(135deg, ${color1}, ${color2})`;
    } else {
      return getGlowColor(types[0].type.name);
    }
  };

  const glowGradient = getGlowGradient(pokemon.types);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mt-[-15px] ml-[30px] sm:w-full lg:w-[500px] h-[600px] max-w-lg mx-auto flex flex-col items-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-200 to-white opacity-20 rounded-3xl"></div>

      <div className="z-10 flex flex-col items-center mb-4 relative">
        <div
          className="absolute inset-0 z-0 blur-3xl"
          style={{
            background: glowGradient,
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            filter: "blur(45px)",
          }}
        ></div>

        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="w-32 h-32 object-contain mb-2 relative z-10"
        />
        <h2 className="text-2xl font-bold text-center capitalize text-gray-900 mt-2 relative z-10">
          {pokemon.name}
        </h2>

        <div className="flex mt-2 space-x-2 relative z-10">
          {pokemon.types.map((type, idx) => (
            <span
              key={idx}
              className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getTypeColor(
                type.type.name
              )}`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full overflow-y-auto z-10 mt-4 flex-grow">
        <PokemonAttributes pokemon={pokemon} />
      </div>
    </div>
  );
};

export default PokemonDetails;
