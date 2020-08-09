import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import Axios from "axios";
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { StackParamList } from "../../App";
import { Member, server } from "../../model/houses";
import Card from './card';

type Props = StackScreenProps<StackParamList, 'detail'>

const ConfirmBtn = ()=>{
    const navigation = useNavigation()
    return(
        <TouchableOpacity onPress={ ()=> navigation.goBack() } style={{ marginBottom: 20, marginRight: 20, alignSelf: "flex-end" }}>
            <LinearGradient colors={['#5ABDFF', '#88E7FF']} style={ styles.confirmBtn }>
                <Feather name="check-circle" size={35} color="white" />
                <Text style={{ fontSize: 25, color: "white", marginHorizontal: 10, fontWeight:"bold" }}>Confirm</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default ({ route, navigation }:Props)=>{
    const { houseName } = route.params
    const { houseNumber } = route.params

    const [ members, setMembers ] = useState([])

    useEffect(
        ()=>{
            (
                async()=>{
                    Axios.get(server + '/familyDetails', {
                        params: {
                            ward: await AsyncStorage.getItem('ward'),
                            houseNumber: houseNumber,
                        }
                    })
                        .then((res)=>{
                            setMembers(res.data)
                        })
                }
            )()
        },
    [])

    return(
        <View style={styles.screen}>
            <View>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={[styles.header, { justifyContent: "flex-start", marginTop: 0, marginHorizontal: 0 }]}
                        onPress={()=>{navigation.navigate("home")}}
                    >
                        <Ionicons name="ios-arrow-back" size={30} color="#888" />
                        <Text style={styles.name}>{ houseName }</Text>
                        <Text style={[styles.name, {fontWeight: "500"}]} >{ houseNumber }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> navigation.navigate('addVoter', { houseNumber: houseNumber })} >
                        <Feather name='user-plus' size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.details}>
                    {
                        members.map((member:Member)=> {
                            return (
                                <Card name={ member.name } voterId={ member.voterId } guardian={ member.guardian } gender={ member.gender } key={ member.voterId as string } />
                            )
                        })
                    }
                    <View style={{ height: 200 }} />
                </ScrollView>
            </View>
            {/* <SearchBar/> */}
            <View style={{ position: 'absolute', bottom: 0, minWidth: '100%' }}>
                <ConfirmBtn/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between'
    },
    header: {
        marginTop: 50,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
    },
    name: {
        fontSize: 25,
        fontWeight: "700",
        marginLeft: 10
    },
    details:{
        marginHorizontal: 30,
        marginTop: 30,
        marginBottom: 100,
    },
    detailsHeader: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 5,
    },
    confirmBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 100,
    }
})