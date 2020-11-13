import { Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl, BackHandler } from 'react-native';
import { Easing } from 'react-native-reanimated';
import { timing } from "react-native-redash";
import { housesLeftAPI, progressAPI } from '../../api/v1';
import { StackParamList } from '../../App';
import ProgressArc from '../../components/animatedArcProgress';
import { lwrap } from '../../model/language'

type Props = StackScreenProps<StackParamList, 'tabs'>

export default ({ navigation }:Props)=>{
    //exit app on back
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                BackHandler.exitApp()
                return true
            }
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    const [ progress, setProgress ] = useState(0)
    const [ totalHouses, setTotal ] = useState(0)
    const [ completed, setCompleted ] = useState(0)
    const [ward, setWard] = useState<null|string>('')
    const [houses, setHouses] = useState<{ houseName: string, houseNumber: string }[]>([])
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        loadProgress()
        housesLeftAPI()
            .then((res) => setHouses(res.data || []))
            .finally(() => setRefreshing(false))
    }, []);

    const loadProgress = async () => {
        await progressAPI()
            .then((res) => {
                setProgress(res.data.totalHouses ? res.data.completed / res.data.totalHouses : res.data.completed > res.data.totalHouses ? 1 : 0)
                setTotal(res.data.totalHouses)
                setCompleted(res.data.completed)
            })
            .catch(() => {
                AsyncStorage.multiRemove(['auth', 'ward', 'wardId', 'cityId', 'districtId', 'uid'])
                    .then(() => navigation.navigate('signIn'))
            })
    }

    useEffect(() => {
        AsyncStorage.getItem('ward')
            .then((ward) => {
                setWard(ward)
            })
        loadProgress()
        housesLeftAPI()
            .then((res) => setHouses(res.data || []))
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
                    <Text style={styles.header}>{lwrap('Progress')}</Text>
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
            <ScrollView style={{ marginTop: 20 }} contentContainerStyle={{ alignItems: "center", justifyContent: 'center' }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <ProgressArc progress={timing(config)} style={{ marginTop: 20 }} />
                <View style={{ marginTop: -150, marginBottom: 60, alignItems: "center" }}>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 40,
                    }}>{completed}</Text>
                    <Text style={{fontSize: 20, marginTop: 10}}>{totalHouses}</Text>
                    <Text style={{ color: '#888' }}>{lwrap('Houses')}</Text>
                </View>
                <Text style={{ fontSize: 20, fontWeight: "bold", alignSelf: 'flex-start', marginLeft: 40, marginBottom: 20 }} >{lwrap('Houses Left')}</Text>
                {
                    houses.map(({ houseName, houseNumber }) => {
                        return (
                            <TouchableOpacity
                                style={{ flexDirection: "row", justifyContent: 'space-between', elevation: 1, backgroundColor: '#f9f9f9', padding: 10, width: 300, marginBottom: 10, borderRadius: 10 }}
                                onPress={() => {
                                    navigation.navigate('detail', {
                                        houseName: houseName,
                                        houseNumber: parseInt(houseNumber),
                                    })
                                }}
                            >
                                <Text>{houseName}</Text>
                                <Text>{houseNumber}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
                <View style={{ height: 20 }} ></View>
            </ScrollView>
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