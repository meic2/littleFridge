import Tags from "react-native-tags";
import {Input, Text, Image, Avatar, Button} from 'react-native-elements';
import {SafeAreaViewComponent, ScrollView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import * as React from 'react';
import { View } from '../components/Themed';
import {Recipe, SpoonFailure, SpoonGrocery, SpoonServing} from "../types";
import {emptyImageUri} from "../constants/util";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import Layout from "../constants/Layout";
import {Ionicons} from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import {postGrocery} from "../FridgeModel/FetchGrocery";
import {isSpoonFailure} from "../utils";
import {postRecipe} from "../FridgeModel/FetchRecipe";
import {orangeColor} from "../constants/Colors";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  tag:{
    marginLeft: 10,
  },
  title: {
    color: '#5E5E5E',
    alignSelf: 'flex-start',
    marginLeft: 15,
    fontSize: 25,
    marginBottom:15
  },
  input:{
    borderRadius: 15,
    width: Layout.window.width - 60, // device width - some margin
    marginLeft: 30,
    fontSize:15,
  },
  imageContainer: {
    margin: 30,
  },
  image: {
    width: Layout.window.width - 60, // device width - some margin
    height: Layout.window.height / 2 - 60, // device height / 2 - some margin
    borderRadius: 20,
  },
  inputTag:{
    marginLeft: 15,
    color: '#5E5E5E',
    fontWeight:"bold"
  },
  text:{
    marginLeft:20
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default function GroceryView(
  props: {
    navigation: any,
    recipe: Recipe|undefined,
    newInstance: boolean
  }
) {
  const {navigation, recipe, newInstance} = props;
  const [ImageSource, setImageSource] = useState<string>(emptyImageUri);
  const [title, setTitle] = useState<string>('Input Your Recipe Name');
  const [createDate, setCreateDate] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>(['input the ingredients']);

  const [countTag, setCountTag] = useState<number>(0);
  const [recipeID, setRecipeId] = useState<string>('');
  const [describe, setDescribe] = useState<string>('Input your description');

  const initialGroceryParam= (): void=>{
     if (recipe?._id){
       setRecipeId(recipe?._id)
     }
     if (recipe?.description){
       setDescribe(recipe?.description)
     }
    if (recipe?.title){
       setTitle(recipe.title);
      console.log(recipe.title)
    }
     if(recipe?.ingredients){
        setIngredients(recipe.ingredients);
       console.log("!",ingredients);
     }

    if(recipe?.image){
       setImageSource(recipe.image);
    }


    if(recipe?.createDate){
      setCreateDate(recipe.createDate);
      console.log(createDate);
    }
  };

  const updateRecipeDB =async()=>{
    const postResponse = await postRecipe(title, ingredients,
      createDate, recipeID, newInstance, describe);
    if (isSpoonFailure(postResponse)){
      alert((postResponse as SpoonFailure).message);
    }else{
      alert(postResponse);
      //TODO: alert should happen after the submit button, not the first time it enters
    }
  };

  useEffect(()=>{
    initialGroceryParam();
    console.log(countTag)

  },[]);




  return (
    <ScrollView style={{backgroundColor:"white"}}>

      <View style={styles.imageContainer}>
       <Image source={{uri: ImageSource}} style={styles.image} />
      </View>


      {/*title*/}
      <TextInput
        style={styles.title}
        value={title}
        onChangeText={(text)=>setTitle(text)}
        multiline={true}
        editable={true}
        autoFocus
      />

      {/*description*/}
      <Text style={styles.inputTag}>
        {"Description:"}
      </Text>
      <TextInput
        style={styles.text}
        value={describe}
        onChangeText={(text)=>setDescribe(text)}
        multiline={true}
        editable={true}
        autoFocus
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/*<Text style={styles.inputTag}>*/}
        {/*{"#Input your upc barcode if empty:"}*/}
      {/*</Text>*/}

        {/*<Input*/}
        {/*placeholder = 'Input your creation Time: YYYY-MM-DD'*/}
        {/*onChangeText={(text)=>setCreateDate(text)}*/}
        {/*value = {upcId}*/}
        {/*leftIcon= {<Ionicons name="barcode-outline" size={24} color="gray" />}*/}
        {/*containerStyle={styles.input}*/}
        {/*disabled = {!newInstance}*/}
        {/*/>*/}


      <Text style={styles.inputTag}>
        {"#Input your ingredients:"}
      </Text>
      <Tags
        style={{...styles.tag}}
        initialTags={recipe?.ingredients===null ? ingredients : recipe?.ingredients}
        onChangeTags={tags => {
          console.log(ingredients);
          setIngredients(tags);
        }}
        onTagPress={(index: number, event: any, deleted: boolean) =>
          console.log(index, event, deleted ? "deleted" : "not deleted")
        }
        containerStyle={{ justifyContent: "center" }}
        inputStyle={{ backgroundColor: "white" }}
       />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/*createDate input*/}
      <Text style={styles.inputTag}>
        {"#Input your created time:"}
      </Text>
      <Input
        placeholder = 'Input your create Time: YYYY-MM-DD'
        onChangeText={setCreateDate}
        value={createDate}
        leftIcon= {<Ionicons name="md-alarm-outline" size={24} color="gray" />}
        containerStyle={styles.input}
      />


      {/*submit*/}
      <Button
        icon= {<Feather name="check-circle" size={22} color="white" />}
        title="  Submit this information"
        buttonStyle={{backgroundColor: orangeColor}}
        onPress ={()=>{
          updateRecipeDB();
          console.log("Submit!");
        }}

      />

    </ScrollView>
  );
}

//todo: later use redux form possibly to fix the incomplete form problem
