import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from "react";
import {SpoonGrocery} from "../types";
import {getAllGrocery,} from "../FridgeModel/FetchGrocery";
import LoadingView from "../views/LoadingView";
import FridgeOverallView from "../views/FridgeOverallView";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
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

  const [groceries, setGroceries] = useState<SpoonGrocery[]|undefined>(undefined);
  const [load, setLoad] = useState<boolean>(true);

  useEffect(()=>{
    async function fetchGroceryList(){
      const groceryList = await getAllGrocery();
      // console.log("useEffect TaboneScreen line 38", groceryList);
      setGroceries(groceryList);
    }

     function refreshNavigation (){
      navigation.addListener('focus', async () => {
        console.log("refresh navigation, setload = false");
        setLoad(true);
        await fetchGroceryList();
        setLoad(false);
        console.log("the load value now is ", load);
      });
    };

    refreshNavigation();
  }, [navigation]);

  return (
    <View>
      {load ? <LoadingView />
        // only for debug purpose to show the upc code
        // upcCode!=='empty'?<Text>{upcCode}</Text>:null
        :
        <FridgeOverallView
          navigation={navigation}
          groceries={groceries}
        />
      }
    </View>
  );
}


