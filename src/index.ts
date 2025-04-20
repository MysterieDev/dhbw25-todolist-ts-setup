import { Cocktail } from "./interface";

function getCocktails(params: string) {
    return fetch(`http://localhost:3000/drinks${params ? "?"+params : ""}`)
    .then(res => res.json())
    .then((res: Cocktail[]) => res)
}

const cocktailBtn = document.querySelector("#cocktail_btn");
cocktailBtn!.addEventListener("click", showCocktail);

async function showCocktail(){
 const cocktails = await getCocktails("strCategory=Cocktail");

 const randomCocktailIndex = Math.floor(Math.random() * cocktails.length);

 document.querySelector("#name")!.innerHTML = cocktails[randomCocktailIndex].strDrink
 document.querySelector("#description")!.innerHTML = cocktails[randomCocktailIndex].strInstructionsDE
 document.querySelector<HTMLImageElement>("#thumb")!.src = cocktails[randomCocktailIndex].strDrinkThumb
    
}