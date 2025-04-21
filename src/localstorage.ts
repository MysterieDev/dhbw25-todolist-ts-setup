import { Cocktail } from "./interface";

export const COCKTAILS_LOCALSTORAGE_KEY = "favorite_cocktails"

export function setLocalstorageCocktails(cocktails: Cocktail[]){
        const favoriteCocktailsJSON = JSON.stringify(cocktails);
        window.localStorage.setItem(COCKTAILS_LOCALSTORAGE_KEY, favoriteCocktailsJSON);
}