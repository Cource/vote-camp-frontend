import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import addVoter from "./screens/addVoter";
import Detail from "./screens/detail";
import Home from './screens/home';
import Landing from './screens/landing';
import SignIn from "./screens/signIn";

export type StackParamList = {
    landing: undefined;
    home: undefined;
    detail: { houseName: string, houseNumber: Number }
}

const Stack = createStackNavigator();

export default function App() {

    function getStartPage(){
        if(AsyncStorage.getItem('ward')){
            return 'home'
        }else return 'landing'
    }

    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator initialRouteName={getStartPage()} screenOptions={{ headerShown: false }} >
                <Stack.Screen name="signIn" component={SignIn}/>
                <Stack.Screen name="landing" component={Landing} />
                <Stack.Screen name="home" component={Home}/>
                <Stack.Screen name="detail" component={Detail}/>
                <Stack.Screen name="addVoter" component={addVoter}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

