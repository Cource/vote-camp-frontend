import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Member } from "./model/houses";
import Landing from './screens/landing';
import Home from './screens/home';
import Detail from "./screens/detail"

export type StackParamList = {
    landing: undefined;
    home: undefined;
    detail: { name:string, members: Member[] }
}

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator initialRouteName="landing" screenOptions={{ headerShown: false }} >
                <Stack.Screen name="landing" component={Landing} />
                <Stack.Screen name="home" component={Home}/>
                <Stack.Screen name="detail" component={Detail}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

