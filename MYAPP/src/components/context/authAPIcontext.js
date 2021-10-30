import createDataContext from "./createDataContext";
import { NavigateTo } from "../navigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authAPIReducer = (state,action) => {
    switch(action.type)
    {
        case "signin":
            return {
                signinStatus: action.status,
                signinId: action.ID,
                signinName: action.name,
                signinMobile: action.mobile,
                signinGender: action.gender,
                email: action.email
            }
        case "signup":
            return {
                signupStatus: action.status,
                signupId: action.ID
            }
        case "signout":
            return state;
        case "load":
            return {email:action.email};
        default: return state;
    }
}

const signin = (dispatch) => {

    return async(email,password) => {
        try {
            console.log(" ENDETEREDD INTO SIGN API ");
            var APIresStatus,APIresID,APIresName,APIresMobile,APIresEmail;
            await fetch("http://IPADDRESS/passenger/signin",{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    email: email,
                    password: password
                })
            }).then(res => {
                return res.json();
            })
            .then(data => {
                console.log("data   === ",data);
                APIresStatus = data.status,
                APIresID = data.api_key,
                APIresEmail = data.email,
                APIresName = data.name,
                APIresMobile = data.mobile,
                APIresGender = data.gender
            })
            .catch(err => {console.log(err)});
            dispatch({type:"signin",status:APIresStatus,name:APIresName,mobile:APIresMobile,gender:APIresGender,email:APIresEmail});
            if(APIresStatus == "SUCCESS")
            {
                await AsyncStorage.setItem("MY SECRETE KEY",APIresID);
                await AsyncStorage.setItem("MY EMAIL",APIresEmail);
                NavigateTo("main");
            }
        } catch (error) {
            console.error(error);
        }
    }
}
const signup = (dispatch) => {
    var APIresStatus,APIresID;
    return async(email,password,name,mobile,gender,age) => {
        try {
            await fetch("http://IPADDRESS/passenger/signup",{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    email: email,
                    name:name,
                    password: password,
                    mobile:mobile,
                    gender:gender,
                    age:age
                })
            }).then(res => {
                return res.json();
            })
            .then(data => {
                APIresStatus = data.status;
                APIresID = data.passenger_id;
                console.log("API status = ",APIresStatus);
                console.log("API id = ",APIresID);
            })
            .catch(err => {console.log(err)});
            if(APIresStatus == "SUCCESS")
            {
                await AsyncStorage.setItem("MY SECRETE KEY",APIresID);
                await AsyncStorage.setItem("MY EMAIL",email);
                NavigateTo("main");
            }
            dispatch({type:"signup",status:APIresStatus,ID:APIresID});
        } catch (error) {
            console.error(error);
        }
    }
}
const signout = (dispatch) => {
    return async(email) => {
        try {
            await fetch("http://IPADDRESS/passenger/signout",{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    email: email
                })
            }).then(
                (res) => {
                    return res.json()}
            ).then(
                (data) => {
                    if(data.status == "USER LOGGEDOUT")
                    {
                        console.log(" USER SUCCESSFULLY LOGGED OUT ++++++++++++++");
                    }
                }
            ).catch((err) => {console.error(err);});
            await AsyncStorage.removeItem("MY SECRETE KEY");
            await AsyncStorage.removeItem("MY EMAIL");
            dispatch({type:"signout"});
            NavigateTo("signIn");
        } catch (error) {
            console.error(error);
        }
    };
};
const load = (dispatch) => {
    return async(email) => {
        var apiKey;
        try {
            console.log("CALLING THE ISLOGGED API FORM CONTEXT");
            await fetch("http://IPADDRESS/passenger/isLoggedIn",{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    email: email
                })
            }).then(
                (res) => {
                    return res.json()}
            ).then(
                (data) => {
                    apiKey = data.apiKey;
                }
            ).catch((err) => {console.error(err);});
            const isLoggedIn = await AsyncStorage.getItem("MY SECRETE KEY");
            if(isLoggedIn == apiKey)
            {
                NavigateTo("main");
            }
            else
            {
                console.log("navigating to sign in screen");
                NavigateTo("signIn");
            }
            dispatch({type:"load",email:email});
        } catch (error) {
            console.error(error);
        }
    }
}

export const {Provider,Context} = createDataContext(
    authAPIReducer,
    {signin,signup,load,signout},
    {email:"",mobile:0,gender:"",signinStatus:"",signupStatus:"",signupId:""}
);