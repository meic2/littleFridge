import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import { ListItem, Avatar, } from 'react-native-elements';
import { View } from '../components/Themed';
import {SpoonGrocery} from "../types";

const styles = StyleSheet.create({
  container: {
    width:'100%',
    flexGrow: 1,
    // alignItems: 'center'
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

export default function FridgeListView(
  props: {
    navigation: any,
    groceries: SpoonGrocery[] | undefined
  },
) {
  const { navigation, groceries } = props;
  return (
      <ScrollView contentContainerStyle={styles.container}>
        {console.log("INTO FRIDGE VIEW!!!!!!!!!!!!!!!!!!!!!!!!")}
        {
          groceries
          ? groceries.map((grocery, index) =>
            (
              <ListItem
                button
                onPress={() => {
                  console.log(`click on ${grocery._id}`);
                  navigation.navigate('GroceryScreen', { grocery: grocery, newInstance:false});
                }}
                key={`i${JSON.stringify(index)}`}
                bottomDivider
              >
                {grocery.images ? <Avatar source={{ uri: grocery?.images[0] }} /> : null}
                <ListItem.Content>
                  <ListItem.Title>{grocery.title}</ListItem.Title>
                  {grocery.title ? (
                      <ListItem.Subtitle>
                        {`expire: ${grocery.expiration}`}
                      </ListItem.Subtitle>
                    )
                    : null}
                </ListItem.Content>
              </ListItem>
            )) : null}
      </ScrollView>

  );
}
