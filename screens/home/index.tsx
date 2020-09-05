import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-community/async-storage";
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
            .then((ward)=>{
                if (ward==='') navigation.navigate('landing')
                else{
                    setWard(ward)
                    progressAPI().then((res)=>{
                        setProgress(res.data.completed / res.data.totalHouses)
                        setTotal(res.data.totalHouses)
                        setCompleted(res.data.completed)
                    })
                }
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
            <View style={{ marginTop: 40, marginHorizontal: 30 }}>
                <View>
                    <Text style={styles.header}>Campaign Progress</Text>
                    <Text style={styles.subHeader}>{ward}</Text>
                </View>
            </View>
            <View style={{ alignSelf: "center", alignItems: "center", justifyContent: 'center', marginTop: 20 }}>
                <ProgressArc progress={timing(config)} />
                <View style={{position: "absolute", alignItems: "center"}}>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 40,
                    }}>{completed}</Text>
                    <Text style={{fontSize: 20, marginTop: 10}}>{totalHouses}</Text>
                    <Text style={{color: '#888'}}>Houses</Text>
                </View>
                <TouchableOpacity onPress={()=>{
                    AsyncStorage.setItem('ward', '')
                    navigation.navigate('landing')
                }}>
                    <Ionicons name="md-exit" size={30} color="black" />
                </TouchableOpacity>
            </View>
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