import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import {useEffect, useState} from "react";
import {SpoonGrocery} from "../types";
import {getAllGrocery,} from "../FridgeModel/FetchGrocery";
import LoadingView from "../views/LoadingView";
import FridgeOverallView from "../views/FridgeOverallView";
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SearchBar} from "react-native-elements";
import orangeColor from "../constants/Colors";

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
  const [search, setSearch] = useState<string>('');

  // useEffect(()=>{
  //   async function fetchGroceryList(){
  //     const groceryList = await getAllGrocery();
  //     // console.log("useEffect TaboneScreen line 38", groceryList);
  //     setGroceries(groceryList);
  //   }
  //
  //    function refreshNavigation (){
  //     navigation.addListener('focus', async () => {
  //       console.log("refresh navigation, setload = false");
  //       // setLoad(true);
  //       await fetchGroceryList();
  //       setLoad(false);
  //       console.log("the load value now is ", load);
  //     });
  //   };
  //
  //   refreshNavigation();
  // }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      setLoad(true);
      async function fetchGroceryList(usrInput:string=''){
        try {
          const recipeList = await getAllGrocery(usrInput);
          if (isActive) {
            setGroceries(recipeList);
            setLoad(false);
          }
          console.log("useEffect Tab1Screen line 38",);
        }catch (e) {
          //error:
        }
      }
      fetchGroceryList(search);
      return () => {
        isActive = false;
      };
    }, []));

  useEffect(  ()=>{
    try {
       getAllGrocery(search).then(recipeList=>setGroceries(recipeList));
      console.log("useEffect Tab1Screen line 83",);
    } catch (e) {
      //error:
    }
  },[search]);

  return (
    <View>
      {load ? <LoadingView />
        // only for debug purpose to show the upc code
        // upcCode!=='empty'?<Text>{upcCode}</Text>:null
        :
        <View>
          <View  style={{flexDirection: 'row', padding:10}}>
            <SearchBar
              inputStyle={{backgroundColor: orangeColor}}
              inputContainerStyle={{backgroundColor: "white"}}
              containerStyle={{backgroundColor: "white", flex:1,height:40, paddingRight:10}}
              onChangeText={(text)=>{setSearch(text)}}
              value={search}
              placeholder={"search grocery here"}
              lighttheme={true}
              platform={"ios"}
            />

            <Icon.Button
              style={{height:40}}
              name="barcode-scan"
              backgroundColor={'rgb(248, 165, 52)'}
              onPress={()=>{navigation.push('BarCodeScanner')}}
            >
              scan
            </Icon.Button>

          </View>
        <FridgeOverallView
          navigation={navigation}
          groceries={groceries}
        />
        </View>
      }
    </View>
  );
}


