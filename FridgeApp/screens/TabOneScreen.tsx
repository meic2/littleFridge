import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from "react";
import {SpoonFailure, SpoonGrocery} from "../types";
import {searchGroceryByUPC} from "../FridgeModel/SpoonHelper"
import {getAllGrocery, putGrocery} from "../FridgeModel/FetchGrocery";
import {isSpoonFailure, isSpoonGrocery} from "../utils";
import LoadingView from "../views/LoadingView";
import FridgeOverallView from "../views/FridgeOverallView";

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
  const [upcCode, setUpCode] = useState<string>('empty');
  const [groceries, setGroceries] = useState<SpoonGrocery[]|undefined>(undefined);
  const [load, setLoad] = useState<boolean>(true);

  useEffect(()=>{
    async function fetchGroceryList(){
      const groceryList = await getAllGrocery();
      // console.log("useEffect TaboneScreen line 38", groceryList);
      setGroceries(groceryList);
    }

    async function fetchNewGrocery() {
      const newGrocery = await searchGroceryByUPC(upcCode);
      console.log("NEW GROCERY!!!");
      if (isSpoonFailure(newGrocery)){
        //TODO: page with user-input ingredient page
        console.log(newGrocery);
        return;
      }
      if(isSpoonGrocery(newGrocery)){
        //TODO: navgiate to page with auto-filled ingredient page
        //TODO: right now hard-code expiration date only to see dynamically update (change in SpoonHelper/groceryParser)
        console.log("NEW GROCERY INPUT SUCCESS!!!");
        const update = await putGrocery(newGrocery);
      }
    }

    async function refreshScreen() {
      await fetchNewGrocery();
      await fetchGroceryList();
    }
    refreshScreen();
    setLoad(false);
  }, [upcCode]);

  function onScanned(inputCode:string){
    console.log("into onscanned");
    setUpCode(inputCode)
  }

  return (
    <View style={styles.container}>
      {load ? <LoadingView />
        // only for debug purpose to show the upc code
        // upcCode!=='empty'?<Text>{upcCode}</Text>:null
        :
        <FridgeOverallView
          navigation={navigation}
          groceries={groceries}
          onScanned={onScanned}
        />
      }
    </View>
  );
}


