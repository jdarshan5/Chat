import React from "react"

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "../screen/splash";
import Login from "../screen/auth/login";
import Register from "../screen/auth/register";
import Inbox from "../screen/inbox";
import Chat from "../screen/chat";
import Search from "../screen/search";

const Stack = createNativeStackNavigator();

const Router = (): JSX.Element => {
  return(
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash" 
        screenOptions={{ 
          headerShown: false, 
          animation: 'fade'
        }}>
        <Stack.Screen name='Splash' component={Splash} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Inbox' component={Inbox} />
        <Stack.Screen name='Search' component={Search} />
        <Stack.Screen name='Chat' component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;