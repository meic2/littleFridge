import * as React from 'react';
import { StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {Text, View} from '../components/Themed';
import {SpoonGrocery} from "../types";
import FridgeListView from "./FridgeListView";
import {FunctionPassingParamList} from "../types";

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


export default function FridgeOverallView(
  props: {
    navigation: any,
    groceries: SpoonGrocery[] | undefined,
    onScanned: (inputCode:string)=>void,
  },
) {
  const { navigation, groceries, onScanned } = props;
  return (
    <View style={{ ...styles.container, width: '100%' }}>
      <Text style={styles.title}>Fridge</Text>
      <Button
        title={`scan`}
        onPress = {
          ()=>{
            // console.log('code=',upcCode,'upcode');
            navigation.push('BarCodeScanner', {onScanned:onScanned, newInstance:false})
          }
        }
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FridgeListView
        navigation={navigation}
        groceries={groceries}
      />
    </View>
  );
}
