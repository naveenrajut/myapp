import React,{useState,useContext} from "react";
import {Text,View,TouchableOpacity} from "react-native";
import {Input} from "react-native-elements";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import {Context as APIcontext} from "../components/context/authAPIcontext"

const SigninScreen = ({navigation}) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    //const [hide,setHide] = useState(true);
    const {state:{signinStatus},signin} = useContext(APIcontext);

    return (
        <View>
            <Text style = {{fontSize:40,color:"red"}}>LOGIN SCREEN</Text>
            <Input
            label = "Email"
            value = {email}
            onChangeText = {(newData) => setEmail(newData)}
            />
            {console.log("signinRes = ",signinStatus)}
            {
            (signinStatus == "SUCCESS")?
            <Text>{null}</Text>:
            <Text style={{fontSize:15,color:"red"}}>INVALID USER ID</Text>
            }
            <Input
            label = "Password"
            value = {password}
            onChangeText = {(newData) => setPassword(newData)}
            />
            <TouchableOpacity onPress = {() => {signin(email,password)}}>
                <Text style = {{fontSize:20,color:"blue"}}>SIGININ</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => {navigation.navigate("signUp")}}>
                <Text>don't have an account? click here to signup</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SigninScreen;