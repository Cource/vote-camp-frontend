import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { searchAPI } from '../../api/v1';
import Barcode from '../../components/barcode';
import { lwrap } from '../../model/language';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants'

export default ()=>{
    const navigation = useNavigation()

    const [ward, setWard] = useState<null|string>('')
    const [voterId, setVoterId] = useState('')
    const [error, setError] = useState(false)

    useEffect(()=>{
        voterId!==''?
            searchAPI(voterId).then((res)=> {
                navigation.navigate('detail', {
                    houseName: res.data[0].houseName,
                    houseNumber: res.data[0].houseNumber,
                })
            }).catch(() => {
                setError(true)
                setTimeout(() => {
                    setError(false)
                }, 3000)
            })
            .finally(()=> setVoterId(''))
        :null
    }, [voterId])

    useEffect(()=>{
        (async()=>{
            setWard(await AsyncStorage.getItem('ward'))
        })()
    }, [])

    return(
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <Barcode valueSetter={setVoterId} />
            {
                error ?
                    <View style={{ position: "absolute", top: Constants.statusBarHeight, right: 0, left: 0, height: Constants.statusBarHeight, backgroundColor: '#FF4D4D', justifyContent: "center", alignItems: 'center' }} >
                        <Text style={{ color: 'white' }} >Invalid Voter Id</Text>
                    </View>
                    : null
            }
            <View style={styles.header}>
                <Text style={styles.headerText} >{lwrap('Scan')}</Text>
                <Text style={{
                    color: 'white', 
                    textShadowColor:'#0003',
                    textShadowOffset:{width: 2, height: 2},
                    textShadowRadius: 3,}} >{ ward }</Text>
            </View>
            <View style={styles.centerOverlay}>
                <View style={styles.box} >
                    <Feather name="chevron-left" size={70} color="white" style={{ transform: [{ rotate: '45deg' }] }} />
                    <Feather name="chevron-left" size={70} color="white" style={{ transform: [{ rotate: '135deg' }] }} />
                </View>
                <View style={styles.box}>
                    <Feather name="chevron-left" size={70} color="white" style={{ transform: [{ rotate: '135deg' }, { rotateY: '180deg' }] }} />
                    <Feather name="chevron-left" size={70} color="white" style={{ transform: [{ rotate: '45deg' }, { rotateY: '180deg' }] }} />
                </View>
                <Text style={{ color: 'white', width: 300 }} >{lwrap('Align the barcode of the votersID card within this box')}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginLeft: 30,
        marginTop: 40,
        position: "absolute"
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor:'#0003',
        textShadowOffset:{width: 2, height: 2},
        textShadowRadius: 5,
    },
    box: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: 350
    },
    centerOverlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        alignItems: "center",
        justifyContent: 'center'
    }
})