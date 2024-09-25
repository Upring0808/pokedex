import React, { useState, useEffect } from "react";
import {
  ArrowUpCircle,
  Scale,
  Zap,
  ChevronRight,
  Heart,
  Shield,
  Crosshair,
} from "lucide-react";

const PokemonAttributes = ({ pokemon }) => {
  const [activeTab, setActiveTab] = useState("info");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (pokemon && pokemon.species.url) {
      fetch(pokemon.species.url)
        .then((response) => response.json())
        .then((speciesData) => {
          const descriptionEntry = speciesData.flavor_text_entries.find(
            (entry) => entry.language.name === "en"
          );
          setDescription(
            descriptionEntry
              ? descriptionEntry.flavor_text.replace(/\f/g, " ")
              : "No description available."
          );
        })
        .catch((error) => {
          console.error("Error fetching Pokémon description:", error);
        });
    }
  }, [pokemon]);

  const TabButton = ({ name, label, icon: Icon }) => (
    <button
      className={`px-3 py-1 text-sm font-medium transition duration-300 flex items-center ${
        activeTab === name
          ? "text-blue-600 border-b-2 border-blue-600 bg-white"
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
      }`}
      onClick={() => setActiveTab(name)}
    >
      <Icon className="w-4 h-4 mr-1" />
      {label}
    </button>
  );

  const AttributeItem = ({ icon: Icon, label, value, color }) => (
    <div className="flex items-center bg-gray-50 p-2 rounded-lg">
      <Icon className={`w-5 h-5 mr-2 ${color}`} />
      <div>
        <span className="text-xs text-gray-500 block">{label}</span>
        <span className="text-sm font-semibold text-gray-800">{value}</span>
      </div>
    </div>
  );

  const InfoTab = () => (
    <div className="grid grid-cols-2 gap-1 p-1">
      <AttributeItem
        icon={ArrowUpCircle}
        label="Height"
        value={`${pokemon.height / 10}m`}
        color="text-blue-500"
      />
      <AttributeItem
        icon={Scale}
        label="Weight"
        value={`${pokemon.weight / 10}kg`}
        color="text-green-500"
      />
      <AttributeItem
        icon={Zap}
        label="Base XP"
        value={pokemon.base_experience}
        color="text-yellow-500"
      />
      <AttributeItem
        icon={Shield} // Change to Shield icon
        label="Defense" // Change the label to Defense
        value={
          pokemon.stats.find((stat) => stat.stat.name === "defense").base_stat
        } // Find the defense stat value
        color="text-red-500"
      />

      <div className="col-span-2 mt-2">
        <h3 className="text-xs font-semibold mb-1 text-gray-800 flex items-center">
          <Shield className="w-4 h-4 mr-1 text-red-500" />
          Abilities
        </h3>
        <div className="flex flex-wrap gap-1">
          {pokemon.abilities.map((ability, idx) => (
            <span
              key={idx}
              className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
            >
              {ability.ability.name}
            </span>
          ))}
        </div>
      </div>

      <div className="col-span-2 mt-2">
        <h3 className="text-xs font-semibold mb-1 text-gray-800 flex items-center">
          <Heart className="w-4 h-4 mr-1 text-pink-500" />
          Description
        </h3>
        <p className="text-xs text-gray-700 leading-tight bg-gray-50 p-2 rounded-lg text-justify -mt-2">
          {description}
        </p>
      </div>
    </div>
  );

  const StatsTab = () => (
    <div className="grid grid-cols-1 gap-1 p-1 w-[285px] lg:w-[500px]">
      {pokemon.stats.map((stat, idx) => (
        <div key={idx} className="bg-gray-50 p-1 rounded-lg">
          <div className="flex items-center justify-between mb-1 w-full lg:w-[430px]">
            <span className="text-xs font-medium text-gray-700 capitalize">
              {stat.stat.name}
            </span>
            <span className="text-xs font-semibold text-blue-600">
              {stat.base_stat}/255
            </span>
          </div>
          <div className="bg-gray-200 rounded-full h-2 w-full lg:w-[430px]">
            <div
              className="bg-orange-600 h-2 rounded-full"
              style={{ width: `${(stat.base_stat / 255) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full  bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
      <div className="bg-gray-100 px-2 py-1 border-b border-gray-200">
        <nav className="flex" aria-label="Tabs">
          <TabButton name="info" label="Info" icon={ChevronRight} />
          <TabButton name="stats" label="Stats" icon={Crosshair} />
        </nav>
      </div>

      <div className="p-1 h-[255px]">
        {activeTab === "info" && <InfoTab />}
        {activeTab === "stats" && <StatsTab />}
      </div>
    </div>
  );
};

export default PokemonAttributes;
