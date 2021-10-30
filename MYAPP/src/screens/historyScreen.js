//import AsyncStorage from "@react-native-async-storage/async-storage";
import React,{useContext,useState} from "react";
import { Dimensions,Text,View,FlatList,StyleSheet,Modal,TouchableOpacity } from "react-native";
import {NavigationEvents} from "react-navigation";
import {Context as dataAPIcontext} from "../components/context/dataAPIcontext";
import {Context as authAPIcontext} from "../components/context/authAPIcontext";

const {height,width} = Dimensions.get("window");
const MODAL_HEIGHT = (75/100)*height;
const MODAL_WIDTH = (90/100)*width;

const HistoryScreen = () => {
    const {state:{ticketData},ticketInfo} = useContext(dataAPIcontext);
    const {state:{email}} = useContext(authAPIcontext);
    const [modal,setModal] = useState(false);
    const [from,setFrom] = useState("");
    const [to,setTo] = useState("");
    const [bookedTime,setBookedTiem] = useState("");
    const [price,setPrice] = useState("");
    const [busType,setBusType] = useState("");
    const [status,setStatus] = useState("");

    return (
        <View style = {styles.container}>
        <NavigationEvents
        onWillFocus = {
            () => {
                ticketInfo(email);
            }
        }/>
        <Modal visible = {modal} animationType = "fade" transparent={true}>
            <View style = {styles.modalContainer}>
                <View style = {styles.modalStyle}>
                    <Text>QR CODE COMES HERE</Text>
                    <View style = {styles.modelInfo}>
                        <View style={{borderWidth:1}}>
                            <Text style = {{fontSize:20,color:"black",fontWeight:"bold",paddingHorizontal:20,paddingVertical:10}}>FROM</Text>
                            <View style = {{borderWidth:1,borderColor:"#717171"}}/>
                            <Text style = {{fontSize:20,color:"black",fontWeight:"bold",paddingHorizontal:20,paddingVertical:10}}>TO</Text>
                            <View style = {{borderWidth:1,borderColor:"#717171"}}/>
                            <Text style = {{fontSize:20,color:"black",fontWeight:"bold",paddingHorizontal:20,paddingVertical:10}}>TIME</Text>
                            <View style = {{borderWidth:1,borderColor:"#717171"}}/>
                            <Text style = {{fontSize:20,color:"black",fontWeight:"bold",paddingHorizontal:20,paddingVertical:10}}>PRICE</Text>
                            <View style = {{borderWidth:1,borderColor:"#717171"}}/>
                            <Text style = {{fontSize:20,color:"black",fontWeight:"bold",paddingHorizontal:20,paddingVertical:10}}>TYPE</Text>
                            <View style = {{borderWidth:1,borderColor:"#717171"}}/>
                            <Text style = {{fontSize:20,color:"black",fontWeight:"bold",paddingHorizontal:20,paddingVertical:10}}>STATUS</Text>
                        </View>
                        <View style={{borderWidth:1}}>
                            <Text style = {{fontSize:20,color:"black",paddingHorizontal:20,paddingVertical:10}}>{from}</Text>
                            <View style = {{borderWidth:1,borderColor:"#717171"}}/>
                            <Text style = {{fontSize:20,color:"black",paddingHorizontal:20,paddingVertical:10}}>{to}</Text>
                            <View style = {{borderWidth:1,borderColor:"#717171"}}/>
                            <Text style = {{fontSize:20,color:"black",paddingHorizontal:20,paddingVertical:10}}>{bookedTime}</Text>
                            <View style = {{borderWidth:1,borderColor:"#717171"}}/>
                            <Text style = {{fontSize:20,color:"black",paddingHorizontal:20,paddingVertical:10}}>{price}</Text>
                            <View style = {{borderWidth:1,borderColor:"#717171"}}/>
                            <Text style = {{fontSize:20,color:"black",paddingHorizontal:20,paddingVertical:10}}>{busType}</Text>
                            <View style = {{borderWidth:1,borderColor:"#717171"}}/>
                            <Text style = {{fontSize:20,color:"black",paddingHorizontal:20,paddingVertical:10}}>{status}</Text>
                        </View>
                    </View>
                    <View style={{alignItems:"flex-end",justifyContent:"flex-end",marginBottom:15,marginTop:"60%",flexDirection:"row"}}>
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <View style = {{borderWidth:1,borderColor:"#717171",width:MODAL_WIDTH/2}}/>
                        <TouchableOpacity>
                            <Text style={{fontSize:25,paddingVertical:7}}>CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <View style = {{borderWidth:1,borderColor:"#717171",width:MODAL_WIDTH/2}}/>
                        <TouchableOpacity onPress = {() => {setModal(false)}}>
                            <Text style={{fontSize:25,paddingVertical:7}}>CLOSE</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </View>
        </Modal>
        <View style = {styles.title}>
            <Text style={{fontSize:25,color:"white"}}>Your travel history</Text>
        </View> 
            <FlatList
            data = {ticketData}
            keyExtractor = {key => key.ticketId}
            renderItem = {({item}) => {
                return(
                    <View>
                        <TouchableOpacity onPress={() => {
                            setModal(true);
                            setFrom(item.from);
                            setTo(item.to);
                            setBookedTiem(item.bookedTime);
                            setStatus(item.status);
                            setPrice(item.price);
                            setBusType(item.busType);
                            }}>
                        <View style={styles.ticketLayout}>
                            <Text style={styles.text}>FROM : {item.from}</Text>
                            <Text style={styles.text}>TO : {item.to}</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                )
            }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"white"
    },
    ticketLayout: {
        flexDirection:"row",
        backgroundColor:"white",
        width: "94%",
        borderRadius: 13,
        marginTop:10,
        marginBottom:10,
        marginLeft:"3%",
        marginRight:"3%",
        height: 75,
        shadowColor:"#000",
        shadowOffset:{width:0,height:5},
        shadowOpacity:1,
        shadowRadius:10,
        elevation: 6,
        justifyContent:"flex-start",
        alignItems:"center"
    },
    text:{
        fontSize:20,
        color:"black",
        marginLeft:7
    },
    title:{
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: "blue",
        height:"7%"
    },
    modalContainer:{
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    modalStyle:{
        height: MODAL_HEIGHT,
        width: MODAL_WIDTH,
        borderRadius:15,
        backgroundColor: "white",
        flexDirection: "column",
        alignItems:"center"
    },
    modelInfo:{
        flexDirection:"row",
        marginTop:30
    },
    modelButtons:{
        flexDirection: "row-reverse"
    },
});

export default HistoryScreen;