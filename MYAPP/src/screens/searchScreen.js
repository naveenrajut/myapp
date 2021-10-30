import React,{useState,useContext,useEffect} from "react";
import { View,Text,StyleSheet,FlatList,TouchableOpacity,Dimensions } from "react-native";
import {Input} from "react-native-elements";
import {Context as mapAPIcontext} from "../components/context/mapAPIcontext" 

const {width,height} = Dimensions.get("window");
const BUTTON_HIGHT = (6/100)*height;
const BUTTON_WIDTH = (94/100)*width;
var source = {
    lat:"",
    lon:""
};
var destination = {
    lat:"",
    lon:""
};

const SearchScreen = ({navigation}) => {
    const [from,setFrom] = useState("");
    const [to,setTo] = useState("");
    const [flag,setFlag] = useState(0);
    const {state:{placeResults},autoPlaceComplete,getRoute} = useContext(mapAPIcontext);

    useEffect(() => {
        var sourceDestination = { data: 0};
        if(flag === 1)
        {
            sourceDestination = { data: from };
        }
        if(flag === 2)
        {
            sourceDestination = { data: to};
        }
        autoPlaceComplete(sourceDestination,11.6741424,78.008377);
    },[from,to]);

    return(
        <View>
            <View>
            <Input
                inputContainerStyle = {Styles.inputContainer}
                value = {from}
                onChangeText = {(data) => { 
                    setFrom(data);
                    setFlag(1);
                }}
            />
            <Input
                inputContainerStyle = {Styles.inputContainer}
                value = {to}
                onChangeText = {(data) => { 
                    setTo(data);
                    setFlag(2);
                }}
            />
            </View>
            <View style={{justifyContent:"center",alignItems:"center"}}>
                <FlatList
                data = {placeResults}
                keyExtractor = {key => key.id}
                renderItem = {({item}) => {
                    return(
                        <View style={{width: (95/100) * width}}>
                            <TouchableOpacity onPress={() => {
                                if(flag === 1)
                                {
                                    setFrom(item.address);
                                    source = {
                                        lat:item.lat,
                                        lon:item.lon
                                    };
                                    console.log("sssssssssssssssssssssss",source);
                                }
                                if(flag === 2)
                                {
                                    setTo(item.address);
                                    destination = {
                                        lat:item.lat,
                                        lon:item.lon
                                    };
                                    console.log("DDDDDDDDDDDDDDDDDDDDDD",destination);
                                }
                            }}>
                                <View style={{borderTopWidth:1,paddingVertical:15}}>
                                    <Text style={{fontSize:21}}>{item.address}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
            }}
            />
            </View>
            <TouchableOpacity 
            style={Styles.buttonStyle}
            onPress = {() => {
                getRoute(source,destination);
                navigation.navigate("Home");
            }}
            >
                <Text style = {{fontSize:20,color:"white"}}>FIND ROUTE</Text>
            </TouchableOpacity>
        </View>
    );
}

const Styles = StyleSheet.create({
    inputContainer:{
        borderWidth:1,
        borderRadius:5
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


export default SearchScreen;