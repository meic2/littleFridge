import Tags from "react-native-tags";
import TagInput from 'react-native-tag-input';
import {Input, Text, Image, Avatar, Button} from 'react-native-elements';
import {ScrollView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import * as React from 'react';
import { View } from '../components/Themed';
import {SpoonGrocery, SpoonServing} from "../types";
import {emptyImageUri} from "../constants/util";
import {useEffect, useState} from "react";
import Layout from "../constants/Layout";
import {Ionicons} from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import {postGrocery} from "../FridgeModel/FetchGrocery";
import {string} from "prop-types";

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
    grocery: SpoonGrocery|undefined,
    onInput:(newGrocery:SpoonGrocery)=>void,
    newInstance:boolean,
  }
) {
  const {navigation, grocery, onInput, newInstance} = props;
  const [ImageSource, setImageSource] = useState<string>(emptyImageUri);
  const [title, setTitle] = useState<string>('Input Your Grocery Name');
  const [expiration, setExpire] = useState<string>('Input the expiration time');
  const [groceryTags, setTags] = useState<string[]>(['input the tag']);
  const [serveSize, setServeSize] = useState<SpoonServing>(
    {number: 0,
      size: 0,
      unit: "serving unit"});
  const [countTag, setCountTag] = useState<number>(0);
  const [submit, setSubmit] = useState<boolean>(false);
  const [upcId, setUpcId] = useState<string>('');
  const [describe, setDescribe] = useState<string>('Input your description');

   const initialGroceryParam= (): void=>{
     if (grocery?._id){
       setUpcId(grocery?._id)
     }
     if (grocery?.description){
       setDescribe(grocery?.description)
     }
    if (grocery?.title){
       setTitle(grocery.title);
      console.log(grocery.title)
    }
     if(grocery?.importantBadges){
        setTags(grocery.importantBadges);
       console.log("!",groceryTags);
     }

    if(grocery?.images){
       setImageSource(grocery.images[0]);
      console.log(grocery.images[0])
    }
    if(grocery?.servings){
      setServeSize(grocery.servings);
      console.log(serveSize)
    }
  };
  useEffect(()=>{
    initialGroceryParam();
    console.log(countTag)

  },[]);

  //this effect use to upload the changed valu
  useEffect(()=>{
    const updateGroceryDB =async()=>{
      await postGrocery(title, groceryTags, serveSize,
        expiration, upcId, newInstance, describe);
    }
  },[submit]);

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
        onChangeText={(text)=>setTitle(text)}
        multiline={true}
        editable={true}
        autoFocus
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.inputTag}>
        {"#Input your tag:"}
      </Text>
      <Tags
        style={{...styles.tag}}
        initialTags={grocery?.importantBadges}
        onChangeTags={tags => {
          console.log(groceryTags);
          setTags(tags);
        }}
        onTagPress={(index: number, event: any, deleted: boolean) =>
          console.log(index, event, deleted ? "deleted" : "not deleted")
        }
        containerStyle={{ justifyContent: "center" }}
        inputStyle={{ backgroundColor: "white" }}
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/*expiration input*/}
      <Input
        placeholder = 'Expiration Time'
        onChangeText={setExpire}
        leftIcon= {<Ionicons name="md-alarm-outline" size={24} color="gray" />}
        containerStyle={styles.input}
      />

      {/*serving size*/}
      <Text style={styles.inputTag}>
        {"Current Serving Size:"}
      </Text>

      <Input
        placeholder = 'Number Of Servings Available'
        onChangeText={(number)=>{
          setServeSize({...serveSize, number:parseFloat(number)})
          console.log()
        }}
        // leftIcon= {<Ionicons name="ios-alarm-outline" size={24} color="black" />}
        containerStyle={styles.input}
      />
      <Input
        placeholder = 'Each Serving Size'
        onChangeText={(size)=>{
          setServeSize({...serveSize, size:parseFloat(size)})
        }}
        // leftIcon= {<Ionicons name="ios-alarm-outline" size={24} color="black" />}
        containerStyle={styles.input}
      />
      <Input
        placeholder = 'unit'
        onChangeText={(unit)=> {
          setServeSize({...serveSize, unit: unit})
          console.log(groceryTags);
        }}
        // leftIcon= {<Ionicons name="ios-alarm-outline" size={24} color="black" />}
        containerStyle={styles.input}
      />

      {/*submit*/}
      <Button
        icon= {<Feather name="check-circle" size={22} color="white" />}
        title="  Submit this information"
        onPress ={()=>{setSubmit(true)}}

      />

    </ScrollView>
  );
}

//todo: later use redux form possibly to fix the incomplete form problem
