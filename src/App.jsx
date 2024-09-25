import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import PokemonList from "./PokemonList";
import PokemonDetails from "./PokemonDetails";
import PaginationComponent from "./Pagination";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./App.css";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage] = useState(10);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth <= 1024 && window.innerWidth > 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchAllPokemon = () => {
    let allPokemon = [];
    let url = "https://pokeapi.co/api/v2/pokemon?limit=100";

    const fetchData = () => {
      if (url) {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            allPokemon = [...allPokemon, ...data.results];
            url = data.next;
            if (url) {
              fetchData();
            } else {
              setPokemonList(allPokemon);
            }
          })
          .catch((error) => {
            console.error("Error fetching Pokémon data:", error);
          });
      }
    };

    fetchData();
  };

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleBackButton = () => {
    setSelectedPokemon(null);
  };

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = searchTerm
    ? filteredPokemon
    : filteredPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const totalPages = Math.ceil(filteredPokemon.length / pokemonPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!isMobile && !isTablet) {
    return (
      <div className="pokedex-container">
        <h1 className="text-center text-3xl md:text-5xl font-bold py-2 mr-[550px] mt-[10px] text-yellow-400 [text-shadow:_-2px_-2px_0_#3B82F6,_2px_-2px_0_#3B82F6,_-2px_2px_0_#3B82F6,_2px_2px_0_#3B82F6]">
          Pokédex
        </h1>
        <div className="pokedex-content">
          <div className="pokemon-list-container">
            <div className="search-pos mt-[10px] mb-[20px]">
              <SearchBar onSearchChange={handleSearchChange} />
            </div>
            <PokemonList
              pokemonList={currentPokemon}
              onPokemonSelect={handlePokemonSelect}
            />
            {!searchTerm && (
              <div className="pagination-container ml-[-25px] mt-[-5px]">
                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>

          {selectedPokemon && (
            <div className="pokemon-details-container">
              <PokemonDetails pokemon={selectedPokemon} />
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto px-4 py-8 max-h-screen overflow-y-auto overflow-x-hidden">
        <h1 className="text-center text-5xl font-bold py-2 mb-4 text-yellow-400 [text-shadow:_-2px_-2px_0_#3B82F6,_2px_-2px_0_#3B82F6,_-2px_2px_0_#3B82F6,_2px_2px_0_#3B82F6]">
          Pokédex
        </h1>
        <div className="w-full mb-8">
          {!selectedPokemon && (
            <div className="mb-8">
              <SearchBar onSearchChange={handleSearchChange} />
            </div>
          )}
          {!selectedPokemon ? (
            <>
              <PokemonList
                pokemonList={currentPokemon}
                onPokemonSelect={handlePokemonSelect}
              />
              {!searchTerm && (
                <div className="mt-4">
                  <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="w-full">
              <Button
                variant="outline"
                size="icon"
                onClick={handleBackButton}
                className="mb-4"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div
                className={`mt-[30px] ${
                  isTablet ? "max-w-[600px]" : "max-w-[90%] "
                } mx-auto flex justify-center items-center ml-[-1px]`}
              >
                <div
                  className={`mt-[10px] ${
                    isMobile ? "max-w-[600px]" : "max-w-[90%] "
                  } mx-auto flex justify-center items-center mr-[-11px]`}
                >
                  <PokemonDetails pokemon={selectedPokemon} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default App;
