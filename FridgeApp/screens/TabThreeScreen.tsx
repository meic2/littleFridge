import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import {SpoonRecipeSearch} from "../types";
import LoadingView from "../views/LoadingView";
import {getRecipeComplexSearch} from "../FridgeModel/SpoonHelper";
import SearchRecipe from "./SearchRecipe";
import {SearchBar} from "react-native-elements";

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

export default function TabThreeScreen({navigation}) {

  const [recipes, setRecipes] = useState<SpoonRecipeSearch[]>([]);
  const [load, setLoad] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  useEffect(()=>{

    async function fetchGroceryList(){
      const recipeList:SpoonRecipeSearch[] = await getRecipeComplexSearch(search);
      setRecipes(recipeList);
      // console.log("???", recipeList);
      // console.log(parsedRecipes[0]);
    }

    // function refreshNavigation (){
    // }
    // return navigation.addListener('focus', async () => {
      // console.log("refresh navigation, setload = false");
    setLoad(true);
    fetchGroceryList();
    setLoad(false);
      // console.log("the load value now is ", load);
    // });
    // refreshNavigation();
  }, [search]);

  return (
    <View >
      {load ? <LoadingView/>
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

        <SearchRecipe
          navigation={navigation}
          recipes={recipes}
        />
        </View>
      }
    </View>
  );
}
