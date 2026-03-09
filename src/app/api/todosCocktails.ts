
import { api } from "./api";

export const getAllCocktails = async() =>{
    const respuesta = await api.get(`search.php?f=a`);
    return respuesta;
}