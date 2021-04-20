import * as React from 'react';
import { StyleSheet} from 'react-native';
import orangeColor from '../constants/Colors'
import {SearchBar} from 'react-native-elements';
import {Text, View} from '../components/Themed';
import {SpoonGrocery} from "../types";
import FridgeListView from "./FridgeListView";
import {useState} from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
    width: '100%',
  },
  button:{
    color:'green'
  }
});


export default function FridgeOverallView(
  props: {
    navigation: any,
    groceries: SpoonGrocery[] | undefined,
  },
) {
  const { navigation, groceries } = props;
  const [search, setSearch] = useState<string>("");

  return (
    <View >
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
      
       <FridgeListView
        navigation={navigation}
        groceries={groceries}
      />
    </View>
  );
}
