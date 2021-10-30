import React from "react";
import {Text,View} from "react-native";
import {createSwitchNavigator,createAppContainer} from "react-navigation";
import SigninScreen from "./src/screens/signinScreen.js";
import SignUpScreen from "./src/screens/signupScreen.js";
import LoadingScreen from "./src/screens/loadingScreen.js";

import {Provider as AuthAPIprovider} from "./src/components/context/authAPIcontext";
import {Provider as TktAPIprovider} from "./src/components/context/ticketAPIcontext";
import {Provider as DataAPIprovider} from "./src/components/context/dataAPIcontext";
import {Provider as MapAPIprovider} from "./src/components/context/mapAPIcontext";
import { setNavigate } from "./src/components/navigator/index.js";
import BottomTab from "./src/screens/bottomTabNavigator.js";

const appNavigator = createSwitchNavigator({
  loading:{
    screen: LoadingScreen,
    navigationOptions: () => {return {header:null}}
  },
  signIn:{
    screen: SigninScreen,
    navigationOptions: () => {return {header:null}}
  },
  signUp:{
    screen: SignUpScreen,
    navigationOptions: () => {return {header:null}}
  },
  main : BottomTab
});

const App = createAppContainer(appNavigator);

export default () => {
  return (
    <AuthAPIprovider>
      <TktAPIprovider>
        <DataAPIprovider>
          <MapAPIprovider>
            <App ref = {(navigator) => {setNavigate(navigator)}}/>
          </MapAPIprovider>
        </DataAPIprovider>
      </TktAPIprovider>
    </AuthAPIprovider>
    )
  };