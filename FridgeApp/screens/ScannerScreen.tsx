import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Button, Route} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {FunctionPassingParamList, SpoonFailure} from "../types";
import {searchGroceryByUPC} from "../FridgeModel/SpoonHelper";
import {isSpoonFailure, isSpoonGrocery} from "../utils";
import {putGrocery} from "../FridgeModel/FetchGrocery";



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default (
  props: {
    navigation: any,
    route: Route,
  }
) => {
  const { navigation, route} = props;
  const [hasPermission, setHasPermission] = useState<null|boolean>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    console.log("into scanner screen");
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  async function fetchNewGrocery(upcCode:string) {
    const newGrocery = await searchGroceryByUPC(upcCode);
    console.log("NEW GROCERY!!!");
    if (isSpoonFailure(newGrocery)){
      console.log(newGrocery);
      alert(newGrocery.message);
      if(newGrocery.status === "failure") {
        navigation.navigate('GroceryScreen', {grocery: undefined, newInstance: true});
        //TODO: further checking if everything works in navigation
      }
    }else if(isSpoonGrocery(newGrocery)){
      //TODO: navgiate to page with auto-filled ingredient page
      //TODO: right now hard-code expiration date only to see dynamically update (change in SpoonHelper/groceryParser)
      console.log("NEW GROCERY INPUT SUCCESS!!!");
      navigation.navigate('GroceryScreen', { grocery: newGrocery, newInstance:true});
    }
  }

  const handleBarCodeScanned = ({type, data}:{type: string, data:string}) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    if (data.length ===13){
      //TODO: Only recognize if the EAN based on USA/CANADA, expo barcode only recognize EAN13 but not UPC-A
      // here is a hard-code version to convert EAN to UPC-A, under product mainly from USA scenario
      //TODO: convert UPC-E to UPC-A for spoonacular API
      data = data.substr(1);
      fetchNewGrocery(data);
    }
    else{
      alert("not the correct form of the upc bar code!");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

