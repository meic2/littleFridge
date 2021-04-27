import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, Switch} from 'react-native';
import {View} from '../components/Themed';
import {SpoonRecipeSearch} from "../types";
import LoadingView from "../views/LoadingView";
import {getRecipeComplexSearch} from "../FridgeModel/SpoonHelper";
import SearchRecipe from "./SearchRecipe";
import { Slider, SearchBar, Text } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import color, { orangeColor} from '../constants/Colors'

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

export default function TabThreeScreen({navigation}) {

  const [recipes, setRecipes] = useState<SpoonRecipeSearch[]>([]);
  const [load, setLoad] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [number, setNumber] = useState<number>(20);
  const [sort, setSort] = useState<boolean>(false);
  useEffect(()=>{
    let isActive:boolean = true;
    setLoad(true);
    async function fetchSpoonRecipeList(){
      try{
        const recipeList:SpoonRecipeSearch[] = await getRecipeComplexSearch();
        if (isActive) {
          setRecipes(recipeList);
          setLoad(false);
        }
      }catch (e) {
        //should not happen if error happens here
        alert(e);
      }
    }

    fetchSpoonRecipeList();
    return () => {
      isActive = false;
    };

  }, []);

  useEffect(  ()=>{
    try {
      if(sort ==true){
        getRecipeComplexSearch(search, number, "healthiness").then(recipeList=>setRecipes(recipeList));
      }else{
        getRecipeComplexSearch(search, number).then(recipeList=>setRecipes(recipeList));
      }
      //
      console.log("useEffect Tab3Screen line 60");
    } catch (e) {
      alert(e);
    }
  },[search, number, sort]);


  return (
    <View >
      {load ? <LoadingView/>
        :
        <View >
          <SearchBar
              inputStyle={{backgroundColor: 'white'}}
              inputContainerStyle={{backgroundColor: 'white'}}
              containerStyle={{backgroundColor: 'white'}}
              onChangeText={(text)=>{setSearch(text)}}
              value={search}
              placeholder={"search recipe here"}
              lighttheme={true}
              platform={"ios"}
          />
          <View
            style={{
              // padding:40,
              // flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{margin:5}}>
              {"Recipes Num: "+ number}
            </Text>

            <Slider
            value={number}
            onValueChange={(number)=>{
              console.log(number);
              setNumber(number)}}
            maximumValue={20}
            minimumValue={1}
            step={1}
            trackStyle={{ height: 10, width: 100, backgroundColor: 'transparent' }}
            thumbStyle={{ height: 30, width: 30, backgroundColor: 'transparent' }}
            thumbProps={{
              children: (
                <MaterialIcons
                  containerStyle={{ bottom: 20, right: 20 }}
                  name="confirmation-number" size={30} color='rgb(248, 165, 52)' />
              ),
            }}
          />

            <Text style={{marginLeft:10}} >{"Sort on Healthy Rate: "}</Text>
            <Switch
              value={sort}
              trackColor={{ false: "white", true: 'rgb(248, 165, 52)' }}
              onValueChange={setSort}
            />

            {/*<Switch value={false} color= 'rgb(248, 165, 52)' >*/}
          </View>
        <SearchRecipe
          navigation={navigation}
          recipes={recipes}
        />
        </View>
      }
    </View>
  );
}
