import {BASE_URL_SPOON, SPOON_APIKEY} from './env'
import {SpoonGrocery, SpoonFailure,} from '../types'
import "isomorphic-fetch"
import {isSpoonFailure, isSpoonGrocery} from "../utils";

const API_SUFFIX = `apiKey=${encodeURIComponent(SPOON_APIKEY.apiKey)}`

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

export async function searchRecipeBy

// const rightUPC = '049000028911';
// const wrongUPC = '123';
// searchGroceryByUPC(rightUPC);
