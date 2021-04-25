import {FLASK_BASE_URL} from "./env";
import {Recipe, SpoonFailure, SpoonGrocery, SpoonServing} from "../types";
import "isomorphic-fetch"
import {dateFormate, isRecipe, isSpoonGrocery} from "../utils";
import {tempRecipeJson} from "../dataTesting";


const JSON_HEADER = {
  "Content-Type": "application/json"
};

//TODO: need to distinguish if device or simulator: change the fetch url accordingly
/**
 * async function to fetch the content from the recipe database
 * @param recipeId the input of the user
 * @return message returned by the Spoon API. If didn't find anything, will return a format of
 * {status: number, message: string} message (without catched by the error)
 */
export async function getRecipe(recipeId:string):Promise<undefined|Recipe> {
  const urlSuffix = `/recipe?recipe_id=${recipeId}`;
  const url = FLASK_BASE_URL+ urlSuffix;
  console.log(url);
  const response = await fetch(url, {
    method: 'GET',
    headers: JSON_HEADER,
  }).then(r => (r.text()))
    .catch((error) => {
      //should less happened
      console.log('Error: ', error.toString());
      return undefined;
    });
  if (isRecipe(response)){
    return (JSON.parse(response) as Recipe);
  }
  return undefined;
}

/**
 * async function to fetch all the content from the recipe database.
 * @return message returned by the Spoon API. If didn't find anything, will return empty list from the db method.
 */
export async function getAllRecipe():Promise<undefined|Recipe[]> {
  const urlSuffix = `/recipe?recipe_id=all`;
  const url = FLASK_BASE_URL+ urlSuffix;
  console.log(url);
  const response = await fetch(url, {
    method: 'GET',
    headers: JSON_HEADER,
  }).then(r => (r.text()))
    .catch((error) => {
      //should less happened
      console.log('GETALLGRECIPE Error: ', error.toString());
      return undefined;
    });
  // console.log(response);
  if (response){
    //todo: Check on the empty list scenario
    const parsed_recipe_arr:Recipe[] = JSON.parse(response);
    console.log("Fetching the recipe from the local server");
    // console.log(response);
    return (parsed_recipe_arr);
  }
  return undefined;
}


/**
 * async function to input the content from the spoonacular.
 * @return message returned by the Spoon API. If didn't find anything, will return a format of
 * {status: number, message: string} message (without catched by the error)
 * @param recipe if error happens, will return undefined with error being printed out; else the string (normal response message) will be printed out
 */
export async function putRecipe(recipe:Recipe|undefined):Promise<string|undefined|SpoonFailure>{
  if (recipe === undefined){
    return undefined;
  }
  const url = FLASK_BASE_URL+"/recipe";
  const response = await fetch(url, {
    method: 'PUT',
    headers: JSON_HEADER,
    body:JSON.stringify(recipe),
  }).then(r => {
    return r.text();
  })
    .catch((error) => {
      //should less happened
      return {status:'500', message:error};
      //TODO: error of duplicate error: need to getGrocery and return a good page
      //TODO: error of cannot recognize: go to new instance page
      //TODO: otherwise, alert(error)
    });
  // console.log(recipe._id);
  console.log(response);
  return response;
}

/**
 *
 * @param title
 * @param ingredients
 * @param createdDate
 * @param _id
 * @param newInstance
 * @param description
 */
export async function postRecipe(
  title:string, ingredients:string[]|undefined,
  createdDate:string, _id:string, newInstance: boolean, description:string|undefined){
  const expireResponse:SpoonFailure = dateFormate(createdDate);
  if (expireResponse.status!== "200"){
    return expireResponse;
  }
  const newRecipe:Recipe={
    title:title,
    spoon_id:-1, //indicating this is irrelevant to the spoondatabase
    ingredients:ingredients,
    createDate:createdDate,
    description:description
  };
  if (newInstance===true){
    //make sure that the upcID is set in the new instance
    newRecipe["_id"] = _id;
    return await putRecipe(newRecipe);
  }
  //here we are going to update existing grocery.
  const urlSuffix = `/recipe?recipe_id=${_id}`;
  const url = FLASK_BASE_URL+ urlSuffix;

  const response = await fetch(url, {
    method: 'POST',
    headers: JSON_HEADER,
    body:JSON.stringify(newRecipe),
  }).then(r => {
    return r.text();
  })
    .catch((error) => {
      //should less happened
      console.log('Error: ', error);
      return {status:'500', message:error};
      //TODO: should not happened: check for not exist in the library
    });
  // console.log(groceryList._id);
  console.log(response);
  return response;
}



// const response = putGrocery(tempjson);
// const response = getGrocery( '030768535032');
// getAllGrocery();
const response = putRecipe(tempRecipeJson);
