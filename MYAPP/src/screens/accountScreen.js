import React,{useContext,useEffect} from "react";
import { Text,View,TouchableOpacity,StyleSheet,Dimensions } from "react-native";
import {Context as APIcontext} from "../components/context/authAPIcontext";
import {Context as dataContext} from "../components/context/dataAPIcontext";

const {height,width} = Dimensions.get("window");
const BUTTON_HIGHT = (6/100)*height;
const BUTTON_WIDTH = (94/100)*width;

const AccountScreen = ({navigation}) => {
    const {state:{email},signout} = useContext(APIcontext);
    const {state:{userData},userInfo} = useContext(dataContext);
    useEffect(() => {
        userInfo(email);
    },[]);

    return (
        <View style = {{alignItems:"center",justifyContent:"center"}}>
            <View style={{width:"100%",backgroundColor:"blue",alignItems:"center",justifyContent:"center",height:(6/100)*height}}>
                <Text style = {{fontSize:25,fontWeight:"100",color:"white"}}>HI {userData.user_name}</Text>
            </View>
            <View style={{alignItems:"flex-start",justifyContent:"center",width:"100%"}}>
                <Text style={{fontSize:25,fontWeight:"500",padding:6}}>Name    {userData.user_name}</Text>
                <View style={{borderWidth:1,width:"100%",borderColor:"#717171"}}/>
                <Text style={{fontSize:25,fontWeight:"500",padding:6}}>Email   {userData.email}</Text>
                <View style={{borderWidth:1,width:"100%",borderColor:"#717171"}}/>
                <Text style={{fontSize:25,fontWeight:"500",padding:6}}>Mobile  {userData.mobile}</Text>
                <View style={{borderWidth:1,width:"100%",borderColor:"#717171"}}/>
                </View>
            <TouchableOpacity style={[Styles.buttonStyle,{marginTop:(55/100)*height}]} onPress={() => {signout(email)}}>
                <Text style={{fontSize:35,color:"white",fontWeight:"100"}}>SIGNOUT</Text>
            </TouchableOpacity>
        </View>
    );
};

const Styles = StyleSheet.create({
    buttonStyle:{
        height:BUTTON_HIGHT,
        width: BUTTON_WIDTH,
        backgroundColor: "blue",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
    }
});
export default AccountScreen;