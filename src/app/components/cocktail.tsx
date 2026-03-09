"use client";

import { useRouter } from "next/navigation";
import { DrinkType } from "../types";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import "./cocktail.css";

export const CocktailbyId = (params: { id?: string; cocktail?: DrinkType }) => {

  const id = params.id;
  const paramsCocktail = params.cocktail;

  const router = useRouter();

  const [cocktail, setCocktail] = useState<DrinkType | null>(
    paramsCocktail ? paramsCocktail : null
  );

  useEffect(() => {
    if (!cocktail && id) {
      api.get(`/lookup.php?i=${id}`).then((res) => {

        if (res.data.drinks) {
          setCocktail(res.data.drinks[0]);
        }
      });
    }
  }, [id]);

  return (

    <>
      {cocktail ? (

        <div className="cocktail-card">

          <img
            className="cocktail-img"
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
          />

          <h2>{cocktail.strDrink}</h2>

          <p><b>Categoría:</b> {cocktail.strCategory}</p>
          <p><b>Alcohol:</b> {cocktail.strAlcoholic}</p>
          <p><b>Vaso:</b> {cocktail.strGlass}</p>
          <button
            onClick={() => router.push(`/cocktail/${cocktail.idDrink}`)}
          >
            Ver detalles
          </button>

        </div>

      ) : (
        <h1>Loading...</h1>
      )}
    </>

  );
};