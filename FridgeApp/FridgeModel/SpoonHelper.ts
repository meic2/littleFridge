import {BASE_URL_SPOON, SPOON_APIKEY, RECIPE_FIND_BY_INGRE, SEARCH_RECIPE_COMPLEX, GET_RECIPE_INFO} from './env'
import {SpoonGrocery, SpoonFailure, SpoonRecipeSearch, SpoonRecipe, Recipe,} from '../types'
import "isomorphic-fetch"
import {isSpoonFailure, isSpoonGrocery} from "../utils";

const API_SUFFIX = `apiKey=${encodeURIComponent(SPOON_APIKEY.apiKey)}`;

const JSON_HEADER = {
    "Content-Type": "application/json"
};


/**
 * a parser that deletes useless attribute and format all the fetched item from spoonacular
 * @param response initial response of the spoonGrocery
 * @param upcInput input from scanning
 * @param userName further implement if need to have multi-user input
 */
export function groceryParser(response: SpoonGrocery, upcInput:string, userName:string):SpoonGrocery {
    //TODO: Hardcode the expiration, need to change here and unittest
    //TODO: further implement authentication for user name
    response._id = upcInput;
    response.spoon_id = response.id;
    response.expiration="N/A";
    if(response.spoonacularScore)
        delete response.spoonacularScore;
    delete response.id;
    return response;

}


/**
 * async function to fetch the content from the spoonacular.
 * @param upcInput the input of the user
 * @return message returned by the Spoon API. If didn't find anything, will return a format of
 * {status: number, message: string} message (without catched by the error)
 */
async function fetchSpoonGroceryByUPC(upcInput:string) {
    const urlSuffix = `/food/products/upc/${upcInput}?`;
    const UPCurl = BASE_URL_SPOON + urlSuffix + API_SUFFIX;
    const response = await fetch(UPCurl, {
        method: 'GET',
        headers: JSON_HEADER,
    }).then(r => r.json())
      .catch((error) => {
        //should less happened
          console.log('Error: ', error.toString());
          return undefined;
      });
    return response;
}

/**
 * search the grocery product by UPC, but only with UPC-A is effective in this app
 * @param upcInput upcInput for scanning upc
 * @param usrName further implements for authetication
 * @return undefined if error happens/no input, otherwise return SpoonGrocery or SpoonFailure accordingly
 */
export async function searchGroceryByUPC(upcInput:string|undefined, usrName:string = 'meic2'):Promise<SpoonGrocery|SpoonFailure|undefined>{
    if(upcInput===undefined){
        return undefined;
    }else{
        const response = await fetchSpoonGroceryByUPC(upcInput);
        if (response == undefined){
            return undefined;
        }else if (isSpoonFailure(response)){
            console.log(response);
            return response;
        }else{
            console.log("new instance!");
            console.log(response);
            return groceryParser((response as SpoonGrocery), upcInput, usrName);
        }

    }
}


/**
 *
 * @param ingreList
 * @param number
 */
async function fetchRecipeByIngredients(ingreList:string[], number:number) {

    const urlSuffix = `?ranking=1&number=${number}&ingredients=${constructIngredientParam(ingreList)}&`;
    const urlRecipe = RECIPE_FIND_BY_INGRE + urlSuffix + API_SUFFIX;
    console.log(urlRecipe);
    const response = await fetch(urlRecipe, {
        method: 'GET',
        headers: JSON_HEADER,
    }).then(r => r.json())
      .catch((error) => {
          //should less happened
          console.log('Error: ', error.toString());
          return undefined;
      });
    return response;
}

function constructIngredientParam(ingreList:string[]) {
    let query = '';
    for (let i:number =0; i < ingreList.length; i+= 1) {
        const ingredient = ingreList[i];
        query += ingredient;
        query += ",+";``
    }
    return query.substring(0, -2);
}


function recipeParser(spoonRecipe:SpoonRecipe):Recipe{

    const ingreList:string[] = spoonRecipe.extendedIngredients.map((spoonIngre, idx)=>{return spoonIngre.name});
    const RecipeInstance:Recipe = {
        _id: spoonRecipe.title,
        image: spoonRecipe.image,
        title: spoonRecipe.title,
        spoon_id:spoonRecipe.id,
        description:spoonRecipe.instructions,
        createDate:"",
        ingredients:ingreList
    };
    console.log(RecipeInstance);
    return RecipeInstance;
}

export async function fetchRecipeByID(recipeID:string): Promise<Recipe|undefined>{
    const url = GET_RECIPE_INFO +`/${recipeID}/information?` + API_SUFFIX;
    const response = await fetch(url, {
        method: 'GET',
        headers: JSON_HEADER,
    }).then(r => r.json())
      .catch((error) => {
          //should less happened
          console.log('Error: ', error.toString());
          return undefined;
      });
    if (response==undefined){
        return undefined;
    }else{
        return recipeParser(response);
    }

}


/**
 *
 * @param number
 * @param sort popularity, healthiness,
 * @param query
 * @param sortDirection asc or desc
 * @param maxCalories
 */
export async function getRecipeComplexSearch(query:string = "", number:number = 10, sort:string = 'random', sortDirection:string = 'asc', maxCalories:number = -1):Promise<SpoonRecipeSearch[]> {
    let urlSuffix = `?query=${query}&number=${number}&sortDirection=${sortDirection}&sort=${sort}&`;
    if (maxCalories > 0) {
        urlSuffix += `maxCalories=${maxCalories}&`
    }
    const urlRecipeComplex = SEARCH_RECIPE_COMPLEX + urlSuffix + API_SUFFIX;
    console.log(urlRecipeComplex);
    const response = await fetch(urlRecipeComplex, {
        method: 'GET',
        headers: JSON_HEADER,
    }).then(r => r.json())
      .catch((error) => {
          //should less happened
          console.log('Error: ', error.toString());
          return undefined;
      });
    console.log(response.results[0]);
    return response.results;
}

// const rightUPC = '049000028911';
// const wrongUPC = '123';
// const q = getRecipeComplexSearch();

fetchRecipeByID("693161");
