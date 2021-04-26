export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  BarCodeScanner: undefined;
};

export type BottomTabParamList = {
  Fridge: undefined;
  Recipe: undefined;
  RecipeSearch: undefined;
};

export type GroceryParamList ={
  Grocery: SpoonGrocery;
}

export type TabOneParamList = {
  TabOneScreen: undefined;
  BarCodeScanner: undefined;
  GroceryScreen: GroceryParamList
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
  RecipeScreen: RecipeParamList
};

export type TabThreeParamList = {
  TabThreeScreen: undefined;
  RecipeScreen: RecipeParamList
};
export type RecipeParamList ={
  Recipe: Recipe;
}


export type FunctionPassingParamList = {
  onScanned: ()=>void,
}

export type SpoonGrocery = {
  _id?: string, //barcode
  spoon_id?: number, //identifier for the spoon, replace the id
  expiration?: string, //should be input by the user later
  id?: number, //original spoon id
  title: string,
  badges?: string[] | null,
  importantBadges?: string[] | null,
  breadcrumbs?: string[] | null,
  generatedText?:string | null,
  imageType?: string | null,
  ingredientCount?: null | number,
  ingredientList?: string,
  ingredients?: SpoonIngredient[],
  likes?: number,
  nutrition?: {
    nutrients: SpoonNutrients[],
    caloricBreakdown?: {
      percentProtein: number,
      percentFat: number,
      percentCarbs: number
    },
    calories?: number,
    carbs?: string,
  },
  price?: number,
  description?:string,
  serving_size?: string,
  aisle?: null |string,
  number_of_servings?: number,
  servings?: SpoonServing,
  spoonacularScore?: number,
  upc?:string,
  brand?:string,
  images?:string[],
}

export type SpoonServing={
  number: number|undefined,
  size: number|undefined,
  unit: string|undefined
}
export type SpoonIngredient = {
  description: string | null,
  name: string | null,
  safety_level: null | string
}

export type SpoonNutrients = {
  "name": string,
  "amount": number,
  "unit": string,
  "percentOfDailyNeeds": number
}

export type SpoonFailure = {
  status: string,
  message: string
}

export type SpoonRecipeSearch = {
  "id": number,
  "title": string,
  "image": string,
  "imageType": string,
}

export type SpoonRecipe = {
  "id": number,
  "title": string,
  "image": string,
  "imageType": string,
  "servings": number,
  "readyInMinutes": number,
  "license": string,
  "sourceName": string,
  "sourceUrl": string,
  "spoonacularSourceUrl": string,
  "aggregateLikes": number,
  "healthScore": number,
  "spoonacularScore": number,
  "pricePerServing": number,
  "analyzedInstructions": [],
  "cheap": boolean,
  "creditsText": string,
  "cuisines": [],
  "dairyFree": boolean,
  "diets": [],
  "gaps": string,
  "glutenFree": boolean,
  "instructions": string,
  "ketogenic": boolean,
  "lowFodmap": boolean,
  "occasions": [],
  "sustainable": boolean,
  "vegan": boolean,
  "vegetarian": boolean,
  "veryHealthy": boolean,
  "veryPopular": boolean,
  "whole30": boolean,
  "weightWatcherSmartPoints": number,
  "dishTypes": string [],
  "extendedIngredients": spoonIngredients[],
  "summary": string,
  "winePairing": {
    "pairedWines": string[],
    "pairingText": string,
    "productMatches": [
      {
        "id": number,
        "title": string,
        "description": string
        "price": string,
        "imageUrl": string,
        "averageRating": number,
        "ratingCount": number,
        "score": number,
        "link": string
      }
      ]
  },
}

export type Recipe={
  _id?:string,  //should be the key: equals to the title
  title: string,
  image?: string,
  spoon_id: number,
  createDate:string,
  ingredients?:string[],
  description?:string
}

export type spoonIngredients = {
  "aisle": string,
  "amount": number,
  "id": number,
  "image": string,
  "meta": [],
  "name": string,
  "original": string,
  "originalName": string,
  "unit": string,
  "unitLong": string,
  "unitShort": string
}
