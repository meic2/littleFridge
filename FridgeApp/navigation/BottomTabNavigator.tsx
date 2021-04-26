import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors, {orangeColor} from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import {BottomTabParamList, TabOneParamList, TabThreeParamList, TabTwoParamList} from '../types';
import ScannerScreen from "../screens/ScannerScreen";
import GroceryScreen from "../screens/GroceryScreen";
import RecipeScreen from "../screens/RecipeScreen";
import TabThreeScreen from "../screens/TabThreeScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Fridge"
      tabBarOptions={{ activeTintColor: orangeColor }}>
      <BottomTab.Screen
        name="Fridge"
        component={TabOneNavigator}
        options={{
          tabBarIcon: () => <MaterialCommunityIcons name="fridge" size={24} color="black" />,
        }}
      />
      <BottomTab.Screen
        name="Recipe"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: () => <MaterialIcons name="set-meal" size={24} color="black" />,
        }}
      />
      <BottomTab.Screen
        name="RecipeSearch"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: () => <MaterialCommunityIcons name="book-search-outline" size={24} color="black" />,
        }}
      />
    </BottomTab.Navigator>
  );
}


// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

//function for stack navigating the fridge screen
function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={
          { headerTitle: 'Fridge',
            headerStyle: {
              backgroundColor: orangeColor,
            }
          }
        }

      />
      <TabOneStack.Screen name="BarCodeScanner" component={ScannerScreen} />
      <TabOneStack.Screen
        name="GroceryScreen"
        component={GroceryScreen}
        options={{
          headerTitle: 'Grocery',
          headerStyle: {
            backgroundColor: orangeColor,
          }}}/>
    </TabOneStack.Navigator>
  );
}


const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{
          headerTitle: 'Recipe Memo',
          headerStyle: {
            backgroundColor: orangeColor,
          }}}
      />
      <TabTwoStack.Screen
        name="RecipeScreen"
        component={RecipeScreen}
        options={{ headerTitle: 'Recipe' }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={TabThreeScreen}
        options={{
          headerTitle: 'Recipe Online',
          headerStyle: {
            backgroundColor: orangeColor,
          }}}
      />
      <TabThreeStack.Screen
        name="RecipeScreen"
        component={RecipeScreen}
        options={{ headerTitle: 'Recipe' }}
      />
    </TabThreeStack.Navigator>
  );
}
