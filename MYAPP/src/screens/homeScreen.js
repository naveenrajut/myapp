import React,{useState,useRef,useContext,useEffect} from "react";
import { Text,View,StyleSheet,Animated,Dimensions,PanResponder,FlatList,TouchableOpacity, Touchable } from "react-native";
//import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
//import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
//import { WebView } from "react-native-webview";
//import mapTemplate from "../map/index.js";
import Map from "../map/maptemplate"
//import Map from "../map/mapContainer";

const {height,width} = Dimensions.get("window");

const MAP_HEIGHT = height;
const SEARCHBAR_HEIGHT = (20/100) * height;
const LISTBAR_HEIGHT = (45/100)*height;
const LISTBAR_MARGIN = height - LISTBAR_HEIGHT;
const SEARCHBAR_MARGIN = height - SEARCHBAR_HEIGHT - LISTBAR_HEIGHT;
const BusList = [
    {bus_no: 1, bus_routeno: 331},
    {bus_no: 2, bus_routeno: 332},
    {bus_no: 3, bus_routeno: 333},
    {bus_no: 4, bus_routeno: 334},
    {bus_no: 5, bus_routeno: 335},
    {bus_no: 6, bus_routeno: 336},
    {bus_no: 7, bus_routeno: 337},
    {bus_no: 8, bus_routeno: 338},
    {bus_no: 9, bus_routeno: 339},
    {bus_no: 10, bus_routeno: 330},
    {bus_no: 11, bus_routeno: 331},
    {bus_no: 12, bus_routeno: 332},
    {bus_no: 13, bus_routeno: 333},
    {bus_no: 14, bus_routeno: 334},
    {bus_no: 15, bus_routeno: 335},
    {bus_no: 16, bus_routeno: 336},
    {bus_no: 1111, bus_routeno: 331},
    {bus_no: 2111, bus_routeno: 332},
    {bus_no: 3111, bus_routeno: 333},
    {bus_no: 4111, bus_routeno: 334},
    {bus_no: 5111, bus_routeno: 335},
    {bus_no: 6111, bus_routeno: 336},
    {bus_no: 7111, bus_routeno: 337},
    {bus_no: 1811, bus_routeno: 338},
    {bus_no: 1911, bus_routeno: 339},
    {bus_no: 1122, bus_routeno: 330},
    {bus_no: 11222, bus_routeno: 331},
    {bus_no: 1222, bus_routeno: 332},
    {bus_no: 1322, bus_routeno: 333},
    {bus_no: 1422, bus_routeno: 334},
    {bus_no: 1522, bus_routeno: 335},
    {bus_no: 1622, bus_routeno: 336}
];

const HomeScreen = ({navigation}) => {

    const position = useRef(new Animated.Value(0)).current;
    const pan = PanResponder.create({
        onMoveShouldSetPanResponder:() => true,
        onPanResponderMove: Animated.event([
            null,
            {dy: position}
        ],
        {useNativeDriver: false})
    });

    return (
        <View>
            <View style={Styles.mapContainer}>
                <Map/>
            </View>
            <Animated.View 
            {...pan.panHandlers}
            style={{
                    marginTop: SEARCHBAR_MARGIN,
                    position:"absolute",
                    width:"100%",
                    height: height,
                    borderWidth:5,
                    borderColor:"red",
                    transform:[{translateY:position}]
                    }}>
                <View style={Styles.searchContainer}>
                    <TouchableOpacity onPress={() => {navigation.navigate("search")}}>
                        <Text>serach here</Text>
                    </TouchableOpacity>
                </View>
                <View style={Styles.listContainer}>
                    <Text>THIS IS LIST VIEW</Text>
                    <FlatList
                        data = {BusList}
                        keyExtractor = {key => key.bus_no}
                        renderItem = {({item}) => {
                            return(
                                <View>
                                    <Text style={{fontSize:40}}>{item.bus_no}</Text>
                                </View>
                            )
                        }}
                    />
                </View>
            </Animated.View>
        </View>
    );
};


const Styles = StyleSheet.create({
    mapContainer:{
        height: height,
        width:"100%"
    },
    searchContainer:{
        height: SEARCHBAR_HEIGHT,
        width :"100%",
        backgroundColor:"white",
        alignItems:"center",
        justifyContent:"center"
    },
    listContainer:{
        height: height,
        width:"100%",
        backgroundColor:"yellow",
        borderWidth:5,
        borderColor:"black",
        flex:1
    },
    inputContainer:{
        borderWidth:1,
        borderRadius:5,
        width: (95/100) * width
    }
});

export default HomeScreen;