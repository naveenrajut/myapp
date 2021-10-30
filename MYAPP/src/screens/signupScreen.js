import React,{useState,useContext} from "react";
import {Text,View,ScrollView,TouchableOpacity,StyleSheet,Dimensions} from "react-native";
import {Input} from "react-native-elements";
import {Context as APIcontext} from "../components/context/authAPIcontext";

const {height,width} = Dimensions.get("window");
const BUTTON_HIGHT = (6/100)*height;
const BUTTON_WIDTH = (94/100)*width;


const SignUpScreen = ({navigation}) => {
    const [email,setEmail] = useState("");
    const [userName,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPsswd,setConfirmPsswd] = useState("");
    const [mobile,setMobile] = useState("");
    const [gender,setGender] = useState("");
    const [age,setAge] = useState("");
    const [validate,setValidate] = useState({
        passwdlen:false,
        passwdmatch: false,
        mobilelen:false,
        gender:false
    });
    //const [hide,setHide] = useState(true);
    const {state:{signupStatus,signupID},signup} = useContext(APIcontext);
    const checkPasswdLen = (data) => {
        if(data.length <= 6)
        {
            setValidate({
                ...validate,
                passwdlen:true
            })
        }
    };

    const checkPsswdMatch = (data) => {
        if(data !== password)
        {
            setValidate({
                ...validate,
                passwdmatch:true
            })
        }
    };

    return (
        <ScrollView
        onScroll = {data => console.log(data.nativeEvent.contentOffset.y)} 
        >
           <Text style = {{fontSize:30,color:"blue",fontWeight:"300",marginHorizontal:"2%",marginBottom:20,marginTop:10}}>Signup...</Text>
            <Input
            inputContainerStyle = {styles.inputContainer}
            label = "Email"
            value = {email}
            onChangeText = {(newData) => setEmail(newData)}
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
            label = "Password"
            value = {password}
            onChangeText = {(newData) => setPassword(newData)}
            onEndEditing = {(data) => {checkPasswdLen(data.nativeEvent.text)}}
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
            {(validate.passwdlen)?
            <Text style={{fontSize:20,fontWeight:"bold",color:"red"}}> password length should be greater than 6...</Text>:
            null}
            <Input
            inputContainerStyle = {styles.inputContainer}
            label = "Confirm password"
            value = {confirmPsswd}
            onChangeText = {(newData) => setConfirmPsswd(newData)}
            onEndEditing = {(data) => {checkPsswdMatch(data.nativeEvent.text)}}
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
            {(validate.passwdmatch)?
            <Text style={{fontSize:20,fontWeight:"bold",color:"red"}}> password mismatch....</Text>:
            null}
            <Input
            inputContainerStyle = {styles.inputContainer}
            label = "user name"
            value = {userName}
            onChangeText = {(newData) => setUsername(newData)}
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
            label = "mobile"
            value = {mobile}
            onChangeText = {(newData) => setMobile(newData)}
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
            label = "gender"
            value = {gender}
            onChangeText = {(newData) => setGender(newData)}
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
            label = "Age"
            value = {age}
            onChangeText = {(newData) => setAge(newData)}
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
            <TouchableOpacity style={styles.buttonStyle} onPress = {async() => {
                signup(email,password,userName,mobile,gender,age);
                }}>
                <Text style = {{fontSize:20,color:"white"}}>SIGNUP</Text>
            </TouchableOpacity>
            <TouchableOpacity style ={{marginLeft:"3%",marginTop:10,marginBottom:30}} onPress = {() => {navigation.navigate("signIn")}}>
                <Text style={{fontSize:18,fontWeight:"400",color:"blue"}}>already have an account? click here to signin</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

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

export default SignUpScreen;