import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import createDataContext from "./createDataContext";
import { NavigateTo } from "../navigator";

const ticketAPIreducer = (state,action) => {
    switch(action.type)
    {
        case "bookTicket":
            return {
                ticketStatus: action.ticketStatus,
                ticketID: action.ticketID
            }
        case "cancelTicket":
            return {

            }
        case "approveTicket":
            return {

            }
        default: return state;
    }
};
const bookTicket = (dispatch) => {
    return async(boardingPoint,destinationPoint,price,busType) => {
        var tktAPIresStatus,tktAPIresID;
        const email = await AsyncStorage.getItem("MY EMAIL"); 
        try {
            var currentdate = new Date(); 
            var datetime = currentdate.getDate()+"/"+ (currentdate.getMonth()+1)+"/"+currentdate.getFullYear()+" @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
            await fetch("http://IPADDRESS/passenger/ticket/book",{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    bookedTime:datetime,
                    boardingPoint: boardingPoint,
                    destinationPoint: destinationPoint,
                    price: price,
                    busType: busType,
                    email: email
                })
            }).then(
                (res) => {return res.json();}
            ).then(
               (data) => {
                   tktAPIresStatus = data.status;
                   tktAPIresID = data.ticketID;
                   console.log(" ticket API status response = ",data);
                } 
            ).catch((err) => {console.error(err)})
            dispatch({type:"bookTicket",ticketStatus:tktAPIresStatus,ticketID:tktAPIresID});
            NavigateTo("home");

        } catch (error) {
            console.error(error);
        }
    };
};
const approveTicket = (dispatch) => {
    return async(ticketID) => {
        try {
            
        } catch (error) {
            console.error(error);
        }
    };
};
const cancelTicket = (dispatch) => {
    return async(ticketID) => {
        try {
            
        } catch (error) {
            console.error(error);
        }
    };
};
export const {Provider,Context} = createDataContext(
    ticketAPIreducer,
    {bookTicket,cancelTicket,approveTicket},
    {ticketStatus:"",ticketID:""}
);