import { Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import addVoter from "./src/screens/addVoter";
import Detail from "./src/screens/detail";
import Home from './src/screens/home';
import Scan from "./src/screens/scan";
import Search from "./src/screens/search";
import SignIn from "./src/screens/signIn";
import Profile from "./src/screens/profile"
import * as Location from "expo-location";
import * as IntentLauncher from 'expo-intent-launcher';
import { setLocationAPI } from "./src/api/v1";
import { Voter } from './src/Design/voter'
import { Alert, AppState, View, Text } from "react-native";
import { localize } from "./src/Design/language";
import Axios from "axios";
import Constants from 'expo-constants'

export type StackParamList = {
    tabs: undefined,
    detail: { houseName: string, houseNumber: number },
    voter: Voter,
    signIn: undefined,
    profile: undefined
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

    const [error, setError] = useState('')

    Axios.interceptors.response.use(res => res, (err) => {
        setError(`${err}`)
        setTimeout(() => {
            setError('')
        }, 3000)
        return err
    })

    useEffect(() => {
        (async () => {
            if (await AsyncStorage.getItem('lang') === null) {
                AsyncStorage.setItem('lang', 'en')
            }
        })()
    })

    useEffect(() => {
        setInterval(async () => {
            let { status } = await Location.requestPermissionsAsync();
            while (status !== 'granted') {
                let perm = await Location.requestPermissionsAsync();
                status = perm.status
            }
            if (await AsyncStorage.getItem('auth') !== null && !AppState.currentState.match(/inactive|background/)) {
                if (!(await Location.getProviderStatusAsync()).gpsAvailable) {
                    Alert.alert('Location', localize('Enable GPS while using the app for live location services'),
                        [{
                            text: 'Ok',
                            onPress: () => IntentLauncher.startActivityAsync(IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS)
                        }]
                    )
                }
                let location = await Location.getCurrentPositionAsync({});
                setLocationAPI(location.coords.latitude, location.coords.longitude);
            }
        }, 60000)
    }, []);

    return (
        <NavigationContainer>
            <StatusBar style="auto" backgroundColor='#f0f0f0aa' hidden={Boolean(error)} />
            <Stack.Navigator initialRouteName='signIn' screenOptions={{ headerShown: false }} >
                <Stack.Screen name="signIn" component={SignIn} />
                <Stack.Screen name="tabs" component={Tabs} />
                <Stack.Screen name="detail" component={Detail} />
                <Stack.Screen name="voter" component={addVoter} />
                <Stack.Screen name="profile" component={Profile} />
            </Stack.Navigator>
            {
                error ?
                    <View style={{ position: "absolute", top: 0, right: 0, left: 0, height: Constants.statusBarHeight, backgroundColor: '#FF4D4D', justifyContent: "center", alignItems: 'center' }} >
                        <Text style={{ color: 'white' }} >{error}</Text>
                    </View>
                    : null
            }
        </NavigationContainer>
    );
}

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName = '';
                    if (route.name === 'home') {
                        iconName = 'home'
                    }
                    if (route.name === 'search') {
                        iconName = 'search'
                    }
                    if (route.name === 'scan') {
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
                tabBarIcon: () => {
                    return (
                        <LinearGradient
                            colors={['#52dcff', '#5abdff']}
                            style={{ padding: 15, marginBottom: 15, alignSelf: "flex-end", borderTopLeftRadius: 20 }}
                        >
                            <Feather name="plus" size={36} color="white" />
                        </LinearGradient>
                    )
                }
            }
            } />
        </Tab.Navigator>
    )
}