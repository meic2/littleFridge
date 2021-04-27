import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {ListItem, Avatar, SearchBar,} from 'react-native-elements';
import { View } from '../components/Themed';
import {Recipe, SpoonRecipe, SpoonRecipeSearch} from "../types";
import {useEffect, useState} from "react";

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

export default function RecipeSearchView(
  props: {
    navigation: any,
    recipes: Recipe[] | undefined
  },
) {
  const { navigation, recipes } = props;

  return (
    <View >
      {/*{console.log("INTO Recipe VIEW")}*/}

      <ScrollView >
        {
          recipes
            ? recipes.map((recipe, index) =>
              (

                <ListItem
                  button
                  onPress={() => {
                    console.log(`click on ${recipe._id}`);
                    navigation.navigate('RecipeScreen', { recipe: recipe, newInstance: true});
                  }}
                  key={`i${JSON.stringify(index)}`}
                  bottomDivider
                >
                  {console.log(index)}
                  {recipe.image ? <Avatar source={{ uri: recipe?.image }} /> : null}
                  <ListItem.Content>
                    <ListItem.Title>{recipe.title}</ListItem.Title>
                    {recipe.title ? (
                        <ListItem.Subtitle>
                          {`Spoonacular Reference: ${recipe.spoon_id}`}
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
