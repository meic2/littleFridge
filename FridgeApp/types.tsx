export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  BarCodeScanner: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
  BarCodeScanner: GroceryScanParamList;

};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type GroceryScanParamList = {
  onScanned: (code:string)=>void,
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
  servings?: {
    number: number,
    size: number,
    unit: string
  },
  spoonacularScore?: number,
  upc?:string,
  brand?:string,
  images?:string[],
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

export type SpoonRecipe = {

}


