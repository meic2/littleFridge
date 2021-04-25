import {FLASK_BASE_URL} from "./env";
import {SpoonFailure, SpoonGrocery, SpoonServing} from "../types";
import "isomorphic-fetch"
import {dateFormate, isSpoonGrocery} from "../utils";


const JSON_HEADER = {
  "Content-Type": "application/json"
};

//TODO: need to distinguish if device or simulator: change the fetch url accordingly
/**
 * async function to fetch the content from the spoonacular.
 * @param upcId the input of the user
 * @return message returned by the Spoon API. If didn't find anything, will return a format of
 * {status: number, message: string} message (without catched by the error)
 */
export async function getGrocery(upcId:string):Promise<undefined|SpoonGrocery> {
  const urlSuffix = `/grocery?grocery_id=${upcId}`;
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
  if (isSpoonGrocery(response)){
    return (JSON.parse(response) as SpoonGrocery);
  }
  return undefined;
}

/**
 * async function to fetch all the content from the spoonacular.
 * @return message returned by the Spoon API. If didn't find anything, will return empty list from the db method.
 */
export async function getAllGrocery():Promise<undefined|SpoonGrocery[]> {
  const urlSuffix = `/grocery?grocery_id=all`;
  const url = FLASK_BASE_URL+ urlSuffix;
  console.log(url);
  const response = await fetch(url, {
    method: 'GET',
    headers: JSON_HEADER,
  }).then(r => (r.text()))
    .catch((error) => {
      //should less happened
      console.log('GETALLGROCERY Error: ', error.toString());
      return undefined;
    });
  // console.log(response);
  if (response){
    //todo: Check on the empty list scenario
    const parsed_grocery_arr:SpoonGrocery[] = JSON.parse(response);
    console.log("Fetching the food from the local server");
    // console.log(response);
    return (parsed_grocery_arr);
  }
  return undefined;
}


/**
 * async function to input the content from the spoonacular.
 * @return message returned by the Spoon API. If didn't find anything, will return a format of
 * {status: number, message: string} message (without catched by the error)
 * @param groceryList if error happens, will return undefined with error being printed out; else the string (normal response message) will be printed out
 */
export async function putGrocery(groceryList:SpoonGrocery|undefined):Promise<string|undefined|SpoonFailure>{
  if (groceryList === undefined){
    return undefined;
  }
  const url = FLASK_BASE_URL+"/grocery";
  const response = await fetch(url, {
    method: 'PUT',
    headers: JSON_HEADER,
    body:JSON.stringify(groceryList),
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
  // console.log(groceryList._id);
  console.log(response);
  return response;
}

/**
 * can submit undefined attributes: if so, there is nothing change in the database(good).
 * @param title
 * @param importantBadges
 * @param servings
 * @param expiration
 * @param _id: the upc id to distinguish the input
 * @param newInstance
 * @param description
 */
export async function postGrocery(
  title:string, importantBadges:string[]|undefined, servings:SpoonServing|undefined,
  expiration:string, _id:string,  newInstance:boolean, description:string|undefined): Promise<string | SpoonFailure | undefined>{
  const expireResponse:SpoonFailure = dateFormate(expiration);
  if (expireResponse.status!== "200"){
    return expireResponse;
  }
  const newGroceryInstance:SpoonGrocery={
    title:title,
    spoon_id:-1, //indicating this is irrelevant to the spoondatabase
    importantBadges:importantBadges,
    servings:servings,
    expiration:expiration,
    description:description
  };
  if (newInstance===true){
    //make sure that the upcID is set in the new instance
    newGroceryInstance["_id"] = _id;
    return await putGrocery(newGroceryInstance);
  }
  //here we are going to update existing grocery.
  const urlSuffix = `/grocery?grocery_id=${_id}`;
  const url = FLASK_BASE_URL+ urlSuffix;

  const response = await fetch(url, {
    method: 'POST',
    headers: JSON_HEADER,
    body:JSON.stringify(newGroceryInstance),
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





// const response = putGrocery(tempGroceryjson);
// const response = getGrocery( '030768535032');
// getAllGrocery();
const response = postGrocery( 'Diet Coke',
  ['update'], undefined,
  '12-09-09', '0123',false,'test' );

