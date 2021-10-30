import React from "react";
import {Dimensions} from "react-native";
import HomeScreen from "./homeScreen.js";
import AccountScreen from "./accountScreen.js";
import TicketScreen from "./ticketScreen.js";
import HistoryScreen from "./historyScreen.js";
import SearchScreen from "./searchScreen.js";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createSwitchNavigator} from "react-navigation";
//import Icon from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//import { createStackNavigator } from '@react-navigation/stack';
import { createStackNavigator } from 'react-navigation-stack'

const {height} = Dimensions.get("window");
const HEIGHT = (8/100)*height;

const BottomTab = createBottomTabNavigator({
    home: createStackNavigator({
        Home:{
            screen: HomeScreen,
            navigationOptions: ({navigation}) => {
                return {header: () => null}
              }
        },
        search:{
            screen: SearchScreen,
        }
    }),
    ticket: {
        screen : TicketScreen,
        navigationOptions: {
            tabBarLabel: "TICKET",
            tabBarIcon: ({tintColor}) => {
                <FontAwesome5 name={"home"} color={tintColor} size={500}/>
            }
    }},
    history:{
        screen: HistoryScreen,
        navigationOptions: {
            tabBarLabel: "HISTORY",
            tabBarIcon: ({tintColor}) => {
                <FontAwesome5 name={"home"} color={tintColor} size={500}/>
            }
    }},
    account: {
        screen: AccountScreen,
        navigationOptions: {
            tabBarLabel: "ACCOUNT",
            tabBarIcon: ({tintColor}) => {
                <FontAwesome5 name={"home"} color={tintColor} size={500}/>
            },
    }
}},{
    tabBarOptions:{
        style:{
            backgroundColor:"white",
            width:"97%",
            height:HEIGHT,
            marginLeft: "2%",
            marginBottom: 5,
            borderRadius: 9,
            borderWidth: 2
        },
        activeTintColor:"green",
        inactiveTintColor:"red"
    }
});

export default BottomTab;