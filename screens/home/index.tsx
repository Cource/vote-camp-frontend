import { Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-community/async-storage";
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Easing } from 'react-native-reanimated';
import { timing } from "react-native-redash";
import { progressAPI } from '../../api/v1';
import { StackParamList } from '../../App';
import { ProgressArc } from '../../components';

type Props = StackScreenProps<StackParamList, 'tabs'>

export default ({ navigation }:Props)=>{
    const [ progress, setProgress ] = useState(0)
    const [ totalHouses, setTotal ] = useState(0)
    const [ completed, setCompleted ] = useState(0)
    const [ward, setWard] = useState<null|string>('')

    useEffect(()=>{
        AsyncStorage.getItem('ward')
            .then((ward) => {
                setWard(ward)
            })
        progressAPI()
            .then((res) => {
                setProgress(res.data.completed / res.data.totalHouses)
                setTotal(res.data.totalHouses)
                setCompleted(res.data.completed)
            })
    }, [])

    const config = {
        duration: 1000,
        from: 0,
        to: progress,
        easing: Easing.bezier(0.5, 1, 0.89, 1),
    }

    return(
        <View style={styles.container}>
            <View style={{ marginTop: 40, marginHorizontal: 30, flexDirection: 'row', justifyContent: "space-between" }}>
                <View>
                    <Text style={styles.header}>Campaign Progress</Text>
                    <Text style={styles.subHeader}>{ward}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('profile')
                    }}
                    style={{ paddingVertical: 10, paddingLeft: 10 }}
                >
                    <Feather name="user" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ marginTop: 20 }} contentContainerStyle={{ alignItems: "center", justifyContent: 'center' }}>
                <ProgressArc progress={timing(config)} style={{ marginTop: 20 }} />
                <View style={{ marginTop: -150, marginBottom: 60, alignItems: "center" }}>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 40,
                    }}>{completed}</Text>
                    <Text style={{fontSize: 20, marginTop: 10}}>{totalHouses}</Text>
                    <Text style={{ color: '#888' }}>Houses</Text>
                </View>
                <Text style={{ fontSize: 20, fontWeight: "bold", alignSelf: 'flex-start', marginLeft: 40, marginBottom: 20 }} >Houses Left</Text>
                {
                    [{ houseName: 'Gololo', houseNumber: '1' }, { houseName: 'lodho', houseNumber: '2' }, { houseName: 'Sanjo Bhavan', houseNumber: '3' }, { houseName: 'Sanjo Bhavan', houseNumber: '4' }, { houseName: 'Sanjo Bhavan', houseNumber: '5' }, { houseName: 'Sanjo Bhavan', houseNumber: '6' }, { houseName: 'Sanjo Bhavan', houseNumber: '7' },].map((item) => {
                        return (
                            <TouchableOpacity key={item.houseNumber} style={{ flexDirection: "row", justifyContent: 'space-between', elevation: 1, backgroundColor: '#f9f9f9', padding: 10, width: 300, marginBottom: 10, borderRadius: 10 }}>
                                <Text>{item.houseName}</Text>
                                <Text>{item.houseNumber}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
            <View></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flex: 1,
    },
    header: {
        fontSize: 30,
        fontWeight: "700",
    },
    subHeader: {
        fontSize: 15,
        fontWeight: "600",
    },
    houseListItem: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginHorizontal: 20,
        paddingVertical: 5,
        marginBottom: 10,
        justifyContent: "space-between",
        flexGrow: 0,
        elevation: 1,
        backgroundColor: "#FFF",
        borderRadius: 6,
    },
    listHeader:{
        marginBottom: 10,
        elevation: 0,
        backgroundColor: "#0000"
    },
    listHeaderText: {
        fontWeight: "bold"
    },
    listText:{
        fontSize: 18,
    }
})