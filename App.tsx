import { Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import addVoter from "./screens/addVoter";
import Detail from "./screens/detail";
import Home from './screens/home';
import Landing from './screens/landing';
import Scan from "./screens/scan";
import Search from "./screens/search";
import SignIn from "./screens/signIn";
import Profile from "./screens/profile"
// import * as Location from "expo-location";

export type StackParamList = {
    // landing: undefined,
    tabs: undefined,
    detail: { houseName: string, houseNumber: number },
    voter: { type: 'detail'|'add', name?: string, guardian?: string, dob?: string, sex?: 'M'|'F'|'T', houseName?: string, houseNumber?: string, voterId?: string, id?: number },
    signIn: undefined,
    profile: undefined
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

    // useEffect(() => {
    //     setInterval(async () => {
    //         let { status } = await Location.requestPermissionsAsync();
    //         while (status !== 'granted') {
    //             let perm = await Location.requestPermissionsAsync();
    //             status = perm.status
    //         }
    //         if (await AsyncStorage.getItem('ward') !== null) {
    //             let location = await Location.getCurrentPositionAsync({});
    //             console.log(location.coords.latitude, location.coords.longitude, await AsyncStorage.getItem('auth'));
    //         }
    //     }, 60000)
    // }, []);

    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator initialRouteName={'signIn'} screenOptions={{ headerShown: false }} >
                <Stack.Screen name="signIn" component={SignIn}/>
                {/* <Stack.Screen name="landing" component={Landing} /> */}
                <Stack.Screen name="tabs" component={Tabs}/>
                <Stack.Screen name="detail" component={Detail}/>
                <Stack.Screen name="voter" component={addVoter}/>
                <Stack.Screen name="profile" component={Profile} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const Tabs = ()=>{
    return(
        <Tab.Navigator
            screenOptions={({ route })=>({
                tabBarIcon: ({ color, size })=>{
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
                        <LinearGradient
                            colors={['#52dcff', '#5abdff']}
                            style={{ padding: 15, marginBottom: 15, alignSelf: "flex-end", borderTopLeftRadius: 20 }}
                        >
                            <Feather name="plus" size={36} color="white"/>
                        </LinearGradient>
                    )
                }}
            } />
        </Tab.Navigator>
    )
}
const nullPage = ()=> null