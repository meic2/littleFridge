import * as React from 'react';
import {Route, StyleSheet} from 'react-native';

import { Text, View } from '../components/Themed';
import {useEffect} from "react";
import RecipeView from "../views/RecipeView";
import {useState} from "react";
import {Recipe, } from "../types";

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



export default function RecipeScreen(
  props: {
    navigation:any,
    route: Route, //recipe
  }
) {
  const [load, setLoad] = useState<boolean>(true);
  const {navigation, route} = props;


  useEffect(()=>{
    setLoad(false);
  },[load]);

  return (
    <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
    <RecipeView
      navigation={navigation}
      recipe={route.params.recipe}
      newInstance={route.params.newInstance}/>
    </View>
  );
}

