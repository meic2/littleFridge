import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import { ListItem, Avatar, } from 'react-native-elements';
import { View } from '../components/Themed';
import {Recipe, SpoonRecipe} from "../types";

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

export default function FridgeListView(
  props: {
    navigation: any,
    recipes: Recipe[] | undefined
  },
) {
  const { navigation, recipes } = props;
  return (
    <View style={{ ...styles.container, width: '100%' }}>
      {console.log("INTO Recipe VIEW")}


      <ScrollView style={{ width: '100%' }}>
        {
          recipes
            ? recipes.map((recipe, index) =>
              (
                <ListItem
                  // button
                  // onPress={() => {
                  //   console.log(`click on ${recipe._id}`);
                  //   navigation.navigate('GroceryScreen', { recipe: recipe, newInstance:false});
                  // }}
                  key={`i${JSON.stringify(index)}`}
                  bottomDivider
                >
                  {recipe.image ? <Avatar source={{ uri: recipe?.image }} /> : null}
                  <ListItem.Content>
                    <ListItem.Title>{recipe.title}</ListItem.Title>
                    {recipe.title ? (
                        <ListItem.Subtitle>
                          {`expire: ${recipe.createDate}`}
                        </ListItem.Subtitle>
                      )
                      : null}
                  </ListItem.Content>
                </ListItem>
              )) : null}
      </ScrollView>

    </View>
  );
}
