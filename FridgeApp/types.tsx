export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type SpoonGrocery = {
  id_?: string, //barcode
  spoon_id?: number, //identifier for the spoon, replace the id
  expiration?: string, //should be input by the user later
  id?: number,
  title: string,
  "badges": string[] | null,
  "importantBadges": string[] | null,
  "breadcrumbs": string[] | null,
  "generatedText":string | null,
  "imageType": string | null,
  "ingredientCount": null | string,
  "ingredientList": string,
  "ingredients": spoonIngredient[],
  "likes"?: number,
  "nutrition": {
    "nutrients": spoonNutrients[],
    "caloricBreakdown": {
      "percentProtein": number,
      "percentFat": number,
      "percentCarbs": number
    },
  },
  "price"?: number,
  "servings": {
    "number": number,
    "size": number,
    "unit": string
  },
  spoonacularScore?: number,
}

export type spoonIngredient = {
  description: string | null,
  name: string | null,
  safety_level: null | string
}

export type spoonNutrients = {
  "name": string,
  "amount": number,
  "unit": string,
  "percentOfDailyNeeds": number
}
