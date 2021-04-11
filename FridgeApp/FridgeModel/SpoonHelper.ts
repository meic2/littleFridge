import {BASE_URL, SPOON_APIKEY} from './env'
import {SpoonGrocery} from '../types'
import "isomorphic-fetch"


const API_SUFFIX = `apiKey=${encodeURIComponent(SPOON_APIKEY.apiKey)}`

const STATUS_NORMAL = 200;
const JSON_HEADER = {
    "Content-Type": "application/json"
};

export function groceryParser(response: SpoonGrocery, upcInput:string, userName:string):SpoonGrocery {
    delete response.spoonacularScore;
    response.id_ = upcInput,
    response.spoon_id = response.id;
    delete response.id;
    return response;
}



async function fetchGroceryByUPC(upcInput:string) {
    const urlSuffix = `/food/products/upc/${upcInput}?`;

    const UPCurl = BASE_URL+ urlSuffix + API_SUFFIX;
    const response = await fetch(UPCurl, {
        method: 'GET',
        headers: JSON_HEADER,
    }).then(r => r.json())
      .catch((error) => {
          console.log('Error: ', error);
          return undefined;
      });
    return response;
}

async function searchGroceryByUPC(upcInput:string, usrName:string = 'meic2'):Promise<SpoonGrocery|undefined>{
    const response = await fetchGroceryByUPC(upcInput);
    if (response == undefined){
        return undefined;
    }
    return groceryParser(response, upcInput, usrName);
}

// searchGroceryByUPC('030768535032');
