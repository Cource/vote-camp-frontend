import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { familyDetailsAPI, increaseProgressAPI } from '../../api/v1';
import { StackParamList } from "../../App";
import { Member } from "../../model/houses";
import Card from './card';
import { ConfirmBtn } from '../../components';

type Props = StackScreenProps<StackParamList, 'detail'>

export default ({ route, navigation }:Props)=>{
    const { houseName } = route.params
    const { houseNumber } = route.params

    const [members, setMembers] = useState([])
    const [confirm, setConfirm] = useState(false)
    const [isLoading, setLoading] = useState(true)

    useEffect(()=>{
        familyDetailsAPI(houseNumber).then((res)=>{
                setMembers(res.data)
            }).finally(()=>{
                setLoading(false)
            })
    }, [])

    useEffect(()=>{
        if (confirm){
            increaseProgressAPI()
        }
    }, [confirm])

    return(
        <View style={styles.screen}>
            <View>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', justifyContent: "flex-start", marginTop: 0, marginHorizontal: 0 }}
                        onPress={()=>{navigation.goBack()}}
                    >
                        <Ionicons name="ios-arrow-back" size={30} color="#888" />
                        <Text style={styles.name}>{ houseName }</Text>
                        <Text style={[styles.name, {fontWeight: "500"}]} >{ houseNumber }</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.details}>
                    {
                        isLoading?
                        <ActivityIndicator size="large"/>
                        :
                        members.map((member:Member)=> {
                            return (
                                <Card name={ member.name } voterId={ member.voterId } guardian={ member.guardian } dob={ member.dob } gender={ member.gender } houseName={ member.houseName } houseNumber={ member.houseNumber } id={ member.id } key={ member.voterId as string } />
                            )
                        })
                    }
                    <View style={{ height: 100 }} />
                </ScrollView>
            </View>
            <View style={{ position: 'absolute', bottom: 0, minWidth: '100%' }}>
                <ConfirmBtn onPress={()=>{
                    setConfirm(!confirm)
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'tabs' }]
                    })
                }} />
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
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
        paddingHorizontal: 30,
        marginTop: 30,
        marginBottom: 100,
    },
    detailsHeader: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 5,
    },
})