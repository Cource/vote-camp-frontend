import { Feather } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { familyDetailsAPI, increaseProgressAPI } from '../../api/v1';
import { StackParamList } from "../../App";
import { Voter } from "../../model/voter";
import Card from './card';
import ConfirmBtn from '../../components/ConfirmBtn';

type Props = StackScreenProps<StackParamList, 'detail'>

export default ({ route, navigation }:Props)=>{
    const { houseName } = route.params
    const { houseNumber } = route.params

    const [members, setMembers] = useState([])
    const [confirm, setConfirm] = useState(false)
    const [isLoading, setLoading] = useState(true)

    function getVoterIds() {
        let voterIds: string[] = []
        members.forEach(({ id }) => {
            voterIds.push(id)
        })
        return voterIds
    }

    useEffect(()=>{
        familyDetailsAPI(houseNumber).then((res)=>{
            setMembers(res.data || [])
            }).finally(()=>{
                setLoading(false)
            })
    }, [])

    useEffect(()=>{
        if (confirm) {
            increaseProgressAPI(getVoterIds())
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
                        <Feather name="chevron-left" size={30} color="#555" />
                        <Text style={styles.name}>{ houseName }</Text>
                        <Text style={[styles.name, {fontWeight: "500"}]} >{ houseNumber }</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.details}>
                    {
                        isLoading?
                        <ActivityIndicator size="large"/>
                        :
                            members.map((member: Voter) => {
                                return (
                                    <Card {...member} key={member.voterId as string} />
                                )
                        })
                    }
                    <View style={{ height: 160 }} />
                </ScrollView>
            </View>
            <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <ConfirmBtn
                    onPress={() => {
                        setConfirm(!confirm)
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'tabs' }]
                        })
                    }}
                    icon={true}
                    position="right"
                />
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
    },
    detailsHeader: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 5,
    },
})