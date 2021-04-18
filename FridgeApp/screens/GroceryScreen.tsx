import * as React from 'react';
import {Route, StyleSheet} from 'react-native';

import { Text, View } from '../components/Themed';
import {useEffect} from "react";
import GroceryView from "../views/GroceryView";
import {useState} from "react";
import {SpoonGrocery} from "../types";

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



export default function TabTwoScreen(
  props: {
    navigation:any,
    route: Route, //grocery
  }
) {
  const [load, setLoad] = useState<boolean>(true);
  const {navigation, route} = props;
  const [groceryItem, setGrocery] = useState<SpoonGrocery|undefined>(route.params.grocery);
  useEffect(()=>{
    setLoad(false);
  },[route.params.grocery, load]);

  function onInput(newGrocery:SpoonGrocery){
    console.log("onInput!");
    setGrocery(newGrocery);
  }
  return (
    <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
    <GroceryView navigation={navigation} grocery={groceryItem} onInput={onInput}/>
    </View>
  );
}

