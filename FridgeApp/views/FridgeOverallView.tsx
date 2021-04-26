import * as React from 'react';
import { StyleSheet} from 'react-native';
import orangeColor from '../constants/Colors'
import {SearchBar} from 'react-native-elements';
import {Text, View} from '../components/Themed';
import {SpoonGrocery} from "../types";
import FridgeListView from "./FridgeListView";
import {useState} from "react";

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

       <FridgeListView
        navigation={navigation}
        groceries={groceries}
      />
    </View>
  );
}
