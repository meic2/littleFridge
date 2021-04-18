import Tags from "react-native-tags";
import {Input, Text, Image, Avatar} from 'react-native-elements';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import * as React from 'react';
import { View } from '../components/Themed';
import {SpoonGrocery} from "../types";
import {emptyImageUri} from "../constants/util";
import {useEffect, useState} from "react";
import Layout from "../constants/Layout";
import {Ionicons} from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  tag:{
    marginLeft: 30,
  },
  name: {
    color: '#5E5E5E',
    alignSelf: 'flex-start',
    marginLeft: 30,
    fontSize: 25,
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
});

export default function GroceryView(
  props: {
    navigation: any,
    grocery: SpoonGrocery|undefined,
    onInput:(newGrocery:SpoonGrocery)=>void,
  }
) {
  const {navigation, grocery, onInput} = props;
  const [ImageSource, setImageSource] = useState<string>(emptyImageUri);
  const [title, setTitle] = useState<string>('Input Your Grocery Name');
  const [expiration, setExpire] = useState<string>('Input the expiration time');
  const [tags, setTags] = useState<string[]>(['input the tag']);
  useEffect(()=>{

    if (grocery?.title){
      setTitle(grocery.title)
    }
    if(grocery?.images){
      setImageSource(grocery.images[0]);
    }
    if(grocery?.badges){
      setTags(grocery.badges);
      console.log(tags);
    }

  },[title, expiration,tags]);
  return (
    <View >

      <View style={styles.imageContainer}>
       <Image source={{uri: ImageSource}} style={styles.image} />
      </View>

      <Tags
        style={styles.tag}
        textInputProps={{
          placeholder: "badges of the grocery"
        }}
        initialTags={tags}
        onChangeTags={(tags: string[]) => {
          console.log(tags);
          // setTags([...tags, tags]);
        }}
        onTagPress={(index: any, event: any, deleted: any) =>
          console.log(index, event, deleted ? "deleted" : "not deleted")
        }
        containerStyle={{ justifyContent: "center" }}
        inputStyle={{ backgroundColor: "white" }}
      />

      <TextInput style={styles.name}
        value={title}
        onChangeText={setTitle}
        multiline={true}
        autoFocus
      />

      <Input
        placeholder = 'Expiration Time'
        onChangeText={setExpire}
        leftIcon= {<Ionicons name="ios-alarm-outline" size={25} color="gray" />}
        containerStyle={styles.input}
      />

      <Input
        placeholder = 'Expiration Time'
        onChangeText={setExpire}
        leftIcon= {<Ionicons name="ios-alarm-outline" size={24} color="black" />}
        containerStyle={styles.input}
      />

    </View>
  );
}

//todo: later use redux form possibly to fix the incomplete form problem
