import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import addVoter from "./screens/addVoter";
import Detail from "./screens/detail";
import Home from './screens/home';
import Landing from './screens/landing';
import SignIn from "./screens/signIn";
import Search from "./screens/search"
import Scan from "./screens/scan"
import { Feather } from "@expo/vector-icons"
import { LinearGradient } from 'expo-linear-gradient';

export type StackParamList = {
    landing: undefined,
    tabs: undefined,
    detail: { houseName: string, houseNumber: number },
    addVoter: { houseNumber: number },
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

    function getStartPage(){
        if(AsyncStorage.getItem('ward')){
            return 'tabs'
        }else return 'landing'
    }

    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator initialRouteName={getStartPage()} screenOptions={{ headerShown: false }} >
                <Stack.Screen name="signIn" component={SignIn}/>
                <Stack.Screen name="landing" component={Landing} />
                <Stack.Screen name="tabs" component={Tabs}/>
                <Stack.Screen name="detail" component={Detail}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
const Tabs = ()=>{
    return(
        <Tab.Navigator
            screenOptions={({ route })=>({
                tabBarIcon: ({ focused, color, size })=>{
                    let iconName = '';
                    if (route.name==='home'){
                        iconName = 'home'
                    }
                    if (route.name==='search'){
                        iconName = 'search'
                    }
                    if (route.name==='scan'){
                        iconName = 'camera'
                    }
                    return <Feather name={iconName} size={size} color={color} />
                }
            })}
            tabBarOptions={{
                showLabel: false
            }}
        >
            <Tab.Screen name="home" component={Home} />
            <Tab.Screen name="search" component={Search} />
            <Tab.Screen name="scan" component={Scan} />
            <Tab.Screen name="add" component={addVoter} options={{
                tabBarIcon: ()=> {
                    return(
                        <LinearGradient colors={['#52dcff', '#5abdff']} style={{ padding: 15, marginBottom: 15, alignSelf: "flex-end", borderTopLeftRadius: 20 }} >
                            <Feather name="plus" size={36} color="white"/>
                        </LinearGradient>
                    )
                }}
            } />
        </Tab.Navigator>
    )
}
const nullPage = ()=> null