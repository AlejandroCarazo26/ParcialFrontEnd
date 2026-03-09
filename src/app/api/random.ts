
import { DrinkType } from "../types";
import { api } from "./api";

type ConjuntoDrinks = {
  drinks: DrinkType[];
};

export const getRandomCocktail = async (): Promise<DrinkType> => {
  const respuesta = await api.get<ConjuntoDrinks>(`/random.php`);
  return respuesta.data.drinks[0];
};