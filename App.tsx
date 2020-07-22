import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Landing } from './screens/landing';
import { Home } from './screens/home';
import {  } from "./screens/detail"

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator initialRouteName="landing" screenOptions={{ headerShown: false }} >
                <Stack.Screen name="landing" component={Landing} />
                <Stack.Screen name="home" component={Home}/>
                <Stack.Screen name="detail" component={Detail}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

