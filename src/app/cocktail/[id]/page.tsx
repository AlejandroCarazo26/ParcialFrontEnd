"use client"

import { getCocktailById } from "@/app/api/cocktail";
import { DrinkType } from "@/app/types";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import "./cocktailIndividual.css";

const CocktailConcreto = () => {
    const { id } = useParams();

    const idBueno = Number(id);

    const [cocktail, setCocktail] = useState<DrinkType | null>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [miErrorcillo, setError] = useState<string>("");

    useEffect(() => {
        getCocktailById(idBueno)
            .then((res) => {
                const arrayMiCocktail = res.data.drinks;
                setCocktail(arrayMiCocktail[0]);
                setError("");
            })
            .catch((e) => {
                setError(`Error cargando los datos: ${e.message ? e.message : e}`)
            })
            .finally(() => {
                setLoading(false);
            })
    }, [idBueno]);

    return (

        <div className="detalle-container">
            {loading && <h1>Loading...</h1>}
            {miErrorcillo && <h2>{miErrorcillo}</h2>}
            {cocktail && (
                <div className="detalle-card">
                    <img
                        className="detalle-img"
                        src={cocktail.strDrinkThumb}
                        alt={cocktail.strDrink}
                    />

                    <h1>{cocktail.strDrink}</h1>
                    <p><b>Categoría:</b> {cocktail.strCategory}</p>
                    <p><b>Alcohol:</b> {cocktail.strAlcoholic}</p>
                    <p><b>Vaso:</b> {cocktail.strGlass}</p>
                    <p className="instrucciones">
                    <b>Instrucciones:</b> {cocktail.strInstructions}
                    </p>

                    <h3>Ingredientes</h3>
                    <ul className="ingredientes">
                        {[
                            cocktail.strIngredient1,
                            cocktail.strIngredient2,
                            cocktail.strIngredient3,
                            cocktail.strIngredient4,
                            cocktail.strIngredient5
                        ]
                            .filter(Boolean)
                            .map((ing, i) => (
                                <li key={i}>{ing}</li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default CocktailConcreto;