import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {GroceryScanParamList} from "../types";



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
    route: GroceryScanParamList,
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

  const handleScanned =(code:string)=>{
    route.params.onScanned(code);
  //TODO: navigate back to TabOneScreen
    //route.onScanned(code);
  }

  const handleBarCodeScanned = ({type, data}:{type: string, data:string}) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    if (type === "org.gs1.EAN-13"){
      //TODO: Only recognize if the EAN based on USA/CANADA, expo barcode only recognize EAN13 but not UPC-A
      // here is a hard-code version to convert EAN to UPC-A, under product mainly from USA scenario

      //TODO: convert UPC-E to UPC-A for spoonacular API
      data = data.substr(1);
    }
    handleScanned(data);
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

