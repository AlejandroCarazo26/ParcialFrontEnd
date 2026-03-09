"use client";


import { useRouter } from "next/navigation";
import "./page.css";
import { useEffect, useState } from "react";
import { CocktailbyId } from "./components/cocktail";
import { api } from "./api/api";
import type { DrinkType, DrinksResponse } from "./types/drink";
import { getRandomCocktail } from "./api/random";


const Home = () => {
  const router = useRouter();

  const [inputText, setInputText] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [drinks, setDrinks] = useState<DrinkType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    if (!search) return;

    setLoading(true);
    setError(null);

    api.get<DrinksResponse>(`/search.php?s=${search}`)
      .then((res) => {
        if(res.data.drinks) {
          setDrinks(res.data.drinks);
        } else {
          setDrinks([]);
        }
      })
      .catch((e) => {
        setError(`Error cargando los datos: ${e.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search]);

  return (
    <div className="cocktails-container">

      <div className="search-section">
        <h1> Bienvenido al buscador de cócteles</h1>

        <input
          className="searchInput"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <button
            className="searchButton"
            onClick={() => setSearch(inputText)}
          > Search 
        </button>
      </div>

        {loading && <h1>Loading...</h1>}
        {error && <h2>{error}</h2>}

        <div className="results-container">
          {drinks.map((drink) => (
            <CocktailbyId key={drink.idDrink} cocktail={drink} />
          ))}
        </div>

        <div className="botonBonito">
          <button 
            onClick={() => {
              getRandomCocktail().then((res) => {
                  router.push(`/cocktail/${res.idDrink}`)
                }
              );
            }}
          >
            Dime algo bonicooo
          </button>
        </div>
    </div>
  );
};

export default Home;