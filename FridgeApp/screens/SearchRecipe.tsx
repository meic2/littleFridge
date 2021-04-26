import * as React from 'react';
import {Route, StyleSheet} from 'react-native';

import { Text, View } from '../components/Themed';
import {useEffect} from "react";
import RecipeView from "../views/RecipeView";
import {useState} from "react";
import {Recipe, SpoonRecipeSearch,} from "../types";
import {fetchRecipeByID} from "../FridgeModel/SpoonHelper";
import {func} from "prop-types";
import RecipeSearchView from "../views/RecipeSearchView";
import LoadingView from "../views/LoadingView";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});



export default function SearchRecipe(
  props: {
    navigation:any,
    recipes: SpoonRecipeSearch[], //recipe
  }
) {
  const [load, setLoad] = useState<boolean>(true);
  const {navigation, recipes} = props;
  const[parsedRecipes, setParsedRecipe] = useState<Recipe[]>([]);

  useEffect(()=>{

    /**
     * reference from stackoverflow: try to filter the value that is not undefined
     * @param value typechecking value
     */
    function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
      return value !== null && value !== undefined;
    }

    async function parsedRecipe(){
      const parsedRecipes:(Recipe|undefined)[]= await Promise.all(recipes.map(async (recipeInstance, idx) =>{
        const parsed = fetchRecipeByID(String(recipeInstance.id));
        return parsed;
      }
      ));
      // console.log(parsedRecipes);
      setParsedRecipe(parsedRecipes.filter(notEmpty));
    }

    // console.log("In SearchRecipe recipe value:", recipes);
    parsedRecipe();
    // console.log("In SearchRecipe", parsedRecipes);
    setLoad(false);
  },[]);

  return (
    <View >
      {load ?
          <LoadingView/> :
          <RecipeSearchView
            navigation={navigation}
            recipes={parsedRecipes}
          />
        }
    </View>
  );
}

