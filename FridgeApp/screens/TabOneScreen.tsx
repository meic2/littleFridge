import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
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
    width: '80%',
  },
});

export default function TabOneScreen({navigation}) {
  const [upcCode, setUpCode] = useState<string>('');

  function onScanned(inputCode:string){
    setUpCode(inputCode)
  }

  return (
    <View style={styles.container}>
      <Button
        title={`scan`}
        onPress = {
          ()=>{
            navigation.push('BarCodeScanner', { onScanned: onScanned, upcCode:upcCode} )
          }
        }
      />

      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}


