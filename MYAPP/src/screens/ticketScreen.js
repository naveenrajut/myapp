import React,{useState,useContext} from "react";
import { Text,View,TouchableOpacity,StyleSheet,Dimensions } from "react-native";
import {Input} from "react-native-elements";
import {Context as tktAPIcontext} from "../components/context/ticketAPIcontext";

const {height,width} = Dimensions.get("window");
const BUTTON_HIGHT = (6/100)*height;
const BUTTON_WIDTH = (94/100)*width;

const TicketScreen = () => {
    const [from,setFrom] = useState("");
    const [to,setTo] = useState("");
    const [busType,setBusType] = useState("");
    const [price,setPrice] = useState("");
    const {bookTicket} = useContext(tktAPIcontext);

    return (
        <View style={{paddingTop:"5%"}}>
            <Input
            inputContainerStyle = {styles.inputContainer}
            label = "Boarding station"
            value = {from}
            onChangeText = {(newData) => setFrom(newData)}
            inputStyle = {{
                fontSize: 30,
                fontWeight:"100"
            }}
            labelStyle = {{
                color:"black",
                fontWeight:"100",
                fontSize:18,
                marginHorizontal:"1%"
            }}
            />
            <Input
            inputContainerStyle = {styles.inputContainer}
            label = "Destination station"
            value = {to}
            onChangeText = {(newData) => setTo(newData)}
            inputStyle = {{
                fontSize: 30,
                fontWeight:"100"
            }}
            labelStyle = {{
                color:"black",
                fontWeight:"100",
                fontSize:18,
                marginHorizontal:"1%"
            }}
            />
            <Input
            inputContainerStyle = {styles.inputContainer}
            label = "Bus type"
            value = {busType}
            onChangeText = {(newData) => setBusType(newData)}
            inputStyle = {{
                fontSize: 30,
                fontWeight:"100"
            }}
            labelStyle = {{
                color:"black",
                fontWeight:"100",
                fontSize:18,
                marginHorizontal:"1%"
            }}
            />
            <Input
            inputContainerStyle = {styles.inputContainer}
            label = "Price"
            value = {price}
            onChangeText = {(newData) => setPrice(newData)}
            inputStyle = {{
                fontSize: 30,
                fontWeight:"100"
            }}
            labelStyle = {{
                color:"black",
                fontWeight:"100",
                fontSize:18,
                marginHorizontal:"1%"
            }}
            />
            <TouchableOpacity style={styles.buttonStyle} onPress = {() => {bookTicket(from,to,price,busType)}}>
                <Text style={{fontSize:35,color:"white"}}>BOOK TICKET</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    inputContainer:{
        borderWidth:2,
        borderRadius:10,
        height:BUTTON_HIGHT,
        width: BUTTON_WIDTH,
        paddingLeft:3,
        marginHorizontal:"1%"
    },
    errorText:{

    },
    buttonStyle:{
        height:BUTTON_HIGHT,
        width: BUTTON_WIDTH,
        backgroundColor: "blue",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        marginLeft:"3%"
    }
});
export default TicketScreen;