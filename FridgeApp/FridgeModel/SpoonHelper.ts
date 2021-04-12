import {BASE_URL, SPOON_APIKEY} from './env'
import {SpoonGrocery, SpoonFailure,} from '../types'
import "isomorphic-fetch"


const API_SUFFIX = `apiKey=${encodeURIComponent(SPOON_APIKEY.apiKey)}`

const STATUS_NORMAL = 200;
const JSON_HEADER = {
    "Content-Type": "application/json"
};


export function groceryParser(response: SpoonGrocery, upcInput:string, userName:string):SpoonGrocery {
    delete response.spoonacularScore;
    response.id_ = upcInput;
    response.spoon_id = response.id;
    delete response.id;
    return response;

}


/**
 * async function to fetch the content from the spoonacular.
 * @param upcInput the input of the user
 * @return message returned by the Spoon API. If didn't find anything, will return a format of
 * {status: number, message: string} message (without catched by the error)
 */
async function fetchGroceryByUPC(upcInput:string) {
    const urlSuffix = `/food/products/upc/${upcInput}?`;
    console.log("?");
    const UPCurl = BASE_URL+ urlSuffix + API_SUFFIX;
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


async function searchGroceryByUPC(upcInput:string, usrName:string = 'meic2'):Promise<SpoonGrocery|SpoonFailure|undefined>{
    const response = await fetchGroceryByUPC(upcInput);
    if (response == undefined){
        return undefined;
    }
    if (response as SpoonFailure){
      return response;
    }
    return groceryParser(response, upcInput, usrName);
}

// const rightUPC = '030768535032';
// const wrongUPC = '123';
// searchGroceryByUPC(wrongUPC);
