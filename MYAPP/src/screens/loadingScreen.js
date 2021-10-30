import React,{useContext,useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text,View } from "react-native";
import {Context as APIcontext} from "../components/context/authAPIcontext";
import { NavigateTo } from "../components/navigator";

const LoadingScreen = () => {
    const {load} = useContext(APIcontext);
    useEffect(async() => {
        const email = await AsyncStorage.getItem("MY EMAIL");
        console.log("email inside useeffect = == ",email);
        if(email == undefined || email == null)
        {
            console.log(" NAVIGATING TO SIGN IN FROM LOADING SCREEN  ");
            NavigateTo("signIn");
        }
        else
        {
            console.log("NAVIGATING TO API AUTH CONTEXT    ");
            load(email);
        }
    });
    return (
        <View style={{alignItems:"center",justifyContent:"center"}}>
            <Text style={{fontSize:30,color:"blue"}}>LOADING SCREEN...</Text>
        </View>
    )
};

export default LoadingScreen;