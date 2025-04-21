import { COCKTAIL_FAVORITES, COCKTAIL_BTN, COCKTAIL_FAVORITE_BTN, cocktailBtn } from "./dom-utils";
import { Cocktail } from "./interface";
import { COCKTAILS_LOCALSTORAGE_KEY, setLocalstorageCocktails } from "./localstorage";
let currentCocktail: Cocktail;
let favoriteCocktails: Cocktail[] = [];
function getCocktails(params: string) {
    return fetch(`http://localhost:3000/drinks${params ? "?" + params : ""}`)
        .then(res => res.json())
        .then((res: Cocktail[]) => res)
}



async function showCocktail() {
    const cocktails = await getCocktails("strCategory=Cocktail");

    const randomCocktailIndex = Math.floor(Math.random() * cocktails.length);

    document.querySelector("#name")!.innerHTML = cocktails[randomCocktailIndex].strDrink
    document.querySelector<HTMLImageElement>("#thumb")!.src = cocktails[randomCocktailIndex].strDrinkThumb

    currentCocktail = cocktails[randomCocktailIndex];
}

function addToFavorites() {
    const isCocktailAlreadyTagged = favoriteCocktails.find(val => currentCocktail.id === val.id);
    if (!isCocktailAlreadyTagged) {
        favoriteCocktails.push(currentCocktail);
        setLocalstorageCocktails(favoriteCocktails)
    }
    renderFavorites();
}

function renderFavorites() {
    COCKTAIL_FAVORITES!.innerHTML = "";
    favoriteCocktails.forEach(cocktail => {
        const SINGLE_FAVORITE_ENTRY = document.createElement("DIV");
        SINGLE_FAVORITE_ENTRY.innerHTML = `<p>${cocktail.strDrink}</p>
    <img src="${cocktail.strDrinkThumb}" style="width:50px" />`;

        // remove favorite btn
        const REMOVE_FAVORITE_BTN = document.createElement("BUTTON");
        REMOVE_FAVORITE_BTN.innerHTML = "X"
        REMOVE_FAVORITE_BTN.addEventListener("click", () => removeFavorite(cocktail.id))
        SINGLE_FAVORITE_ENTRY.appendChild(REMOVE_FAVORITE_BTN);

        // add element to favorites div
        COCKTAIL_FAVORITES!.appendChild(SINGLE_FAVORITE_ENTRY);
    });

}

function removeFavorite(cocktailToDeleteId: string) {
    favoriteCocktails = favoriteCocktails.filter(cocktail => cocktail.id !== cocktailToDeleteId);
    setLocalstorageCocktails(favoriteCocktails);
    renderFavorites();
}

function startApp() {
    const favoriteCocktailsLocalstorage = window.localStorage.getItem(COCKTAILS_LOCALSTORAGE_KEY);

    if (favoriteCocktailsLocalstorage) {
        favoriteCocktails = JSON.parse(favoriteCocktailsLocalstorage);
    }

    COCKTAIL_BTN!.addEventListener("click", showCocktail);
    COCKTAIL_FAVORITE_BTN!.addEventListener("click", addToFavorites);

    renderFavorites();
    showCocktail();
}

startApp()