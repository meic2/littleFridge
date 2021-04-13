import {FLASK_BASE_URL} from "./env";
import {SpoonGrocery} from "../types";
import "isomorphic-fetch"
import {isSpoonGrocery} from "../utils";


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
 * async function to fetch the content from the spoonacular.
 * @param upcId the input of the user
 * @return message returned by the Spoon API. If didn't find anything, will return a format of
 * {status: number, message: string} message (without catched by the error)
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
      console.log('Error: ', error.toString());
      return undefined;
    });
  if (response){
    const parsed_grocery_arr:SpoonGrocery[] = JSON.parse(response);
    return (parsed_grocery_arr);
  }
  return undefined;
}


/**
 * async function to fetch the content from the spoonacular.
 * @return message returned by the Spoon API. If didn't find anything, will return a format of
 * {status: number, message: string} message (without catched by the error)
 * @param groceryList
 */
export async function putGrocery(groceryList:SpoonGrocery|undefined):Promise<string|undefined>{
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
      console.log('Error: ', error);
      return undefined;
    });
  console.log(groceryList._id);
  console.log(response);
  return response;
}



// export async function searchGroceryByUPC(upcInput:string|undefined, usrName:string = 'meic2'):Promise<SpoonGrocery|SpoonFailure|undefined>{
//   if(upcInput===undefined){
//     return undefined;
//   }else{
//     const response = await fetchGroceryByUPC(upcInput);
//     if (response == undefined){
//       return undefined;
//     }
//     if (response as SpoonFailure){
//       return response;
//     }
//     return groceryParser(response, upcInput, usrName);
//   }
// }

// const rightUPC = '030768535032';
// const wrongUPC = '123';
// searchGroceryByUPC(wrongUPC);

const tempjson:SpoonGrocery = {
  title: 'Sundown Naturals Melatonin Gummies 5 mg - 60 CT',
  price: 0,
  likes: 0,
  badges: [ 'egg_free', 'gluten_free' ],
  importantBadges: [ 'no_preservatives', 'gluten_free', 'nut_free' ],
  nutrition:
    { nutrients: [],
      caloricBreakdown: { percentProtein: 0, percentFat: 0, percentCarbs: 100 },
      calories: 15,
      carbs: '4g' },
  serving_size: '2.0 gummies',
  number_of_servings: 25,
  servings: { number: 25, size: 2, unit: 'gummies' },
  breadcrumbs: [ 'grains', 'ingredient' ],
  aisle: null,
  description:
    'Smart facts:Naturally sourced colors.No preservatives.Clinically studied ingredient.Drug-free sleep aid*.For occasional sleeplessness*.Made in the USA with select ingredients from around the world.No gluten, no wheat, no milk, no lactose, no artificial flavor, no artificial sweetener, no preservatives, no soy, no yeast, no fish. Sodium free.Questions? Call toll free 1-888-VITAHELP (848-2435) or visit us at www.sundownnaturals.com.Â©2016.',
  generatedText: null,
  upc: '030768535032',
  brand: 'Sundown Naturals',
  ingredients:
    [ { name: 'nutrient', safety_level: null, description: null },
      { name: 'corn syrup', safety_level: null, description: null } ],
  ingredientCount: 10,
  ingredientList:
    'Corn Syrup, Sugar, Gelatin. Contains 2% of: Citric Acid, Fractionated Coconut Oil (contains Carnauba Wax), Natural Flavor, Pectin, Vegetable Juice (Color)',
  images:
    [ 'https://spoonacular.com/productImages/409329-312x231.jpg',
      'https://spoonacular.com/productImages/409329-90x90.jpg' ],
  imageType: 'jpg',
  _id: '030768535032',
  spoon_id: 409329,
  expiration: '12-2-21'};


// const response = putGrocery(tempjson);
// const response = getGrocery( '030768535032');
getAllGrocery();

