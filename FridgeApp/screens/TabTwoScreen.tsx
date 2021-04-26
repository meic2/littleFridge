import * as React from 'react';
import { StyleSheet } from 'react-native';
import {Button, SearchBar} from 'react-native-elements';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from "react";
import {Recipe, SpoonFailure} from "../types";
import {getAllRecipe, putRecipe} from "../FridgeModel/FetchRecipe";
import { useFocusEffect } from '@react-navigation/native';
import LoadingView from "../views/LoadingView";
import RecipeMemoView from "../views/RecipeMemoView";
import {getAllGrocery} from "../FridgeModel/FetchGrocery";

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
  const [search, setSearch] = useState<string>('');

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      setLoad(true);
      async function fetchGroceryList(usrInput:string=''){
        try {
          const recipeList = await getAllRecipe(usrInput);
          if (isActive) {
            setRecipes(recipeList);
            setLoad(false);
          }
          console.log("useEffect Tab2Screen line 38", recipes);
        }catch (e) {
          //error:
        }
      }
      fetchGroceryList();
      return () => {
        isActive = false;
      };

    }, []));

  useEffect(  ()=>{
    try {
      getAllRecipe(search).then(recipeList=>setRecipes(recipeList));
      console.log("useEffect Tab1Screen line 83",);
    } catch (e) {
      //error:
    }
  },[search]);


  return (
    <View >
      {load ? <LoadingView />
        :
        <View >
          <SearchBar
            inputStyle={{backgroundColor: 'white'}}
            inputContainerStyle={{backgroundColor: 'white'}}
            containerStyle={{backgroundColor: 'white'}}
            onChangeText={(text)=>{setSearch(text)}}
            value={search}
            placeholder={"search recipe here"}
            lighttheme={true}
            platform={"ios"}
          />

        <RecipeMemoView
          navigation={navigation}
          recipes={recipes}
        />
        </View>
      }
    </View>
  );
}
