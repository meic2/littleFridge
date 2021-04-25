import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from "react";
import {Recipe, SpoonFailure} from "../types";
import {getAllRecipe, putRecipe} from "../FridgeModel/FetchRecipe";
import {isSpoonFailure, isSpoonGrocery} from "../utils";
import LoadingView from "../views/LoadingView";
import RecipeMemoView from "../views/RecipeMemoView";

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

export default function TabOneScreen({navigation}) {

  const [recipes, setRecipes] = useState<Recipe[]|undefined>(undefined);
  const [load, setLoad] = useState<boolean>(true);

  useEffect(()=>{
    async function fetchGroceryList(){
      const recipeList = await getAllRecipe();
      // console.log("useEffect TaboneScreen line 38", groceryList);
      setRecipes(recipeList);
    }

    function refreshNavigation (){
      navigation.addListener('focus', async () => {
        console.log("refresh navigation, setload = false");
        setLoad(true);
        await fetchGroceryList();
        setLoad(false);
        console.log("the load value now is ", load);
      });
    }

    refreshNavigation();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {load ? <LoadingView />
        :
        <RecipeMemoView
          navigation={navigation}
          recipes={recipes}
        />
      }
    </View>
  );
}
