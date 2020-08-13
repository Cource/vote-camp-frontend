import React, { useState, useEffect } from 'react';
import Barcode from '../../components/barcode'
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
import { server } from '../../model/houses'
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-community/async-storage';

export default ()=>{
    const navigation = useNavigation()

    const [ward, setWard] = useState<null|string>('')
    const [voterId, setVoterId] = useState('')

    useEffect(()=>{
        voterId!==''?
            Axios.get(server + '/voters', {
                params:{
                    search: voterId
                }
            }).then((res)=> {
                navigation.navigate('detail', {
                    houseName: res.data[0].houseName,
                    houseNumber: res.data[0].houseNumber,
                })
            }).then(()=> setVoterId(''))
        :null
    }, [voterId])

    useEffect(()=>{
        (async()=>{
            setWard(await AsyncStorage.getItem('ward'))
        })()
    }, [])

    return(
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <StatusBar style="light" backgroundColor="#0003" />
            <Barcode valueSetter={setVoterId} />
            <View style={[styles.header, { position: 'absolute' }]}>
                <Text style={styles.headerText} >Scan</Text>
                <Text style={{
                    color: 'white', 
                    textShadowColor:'#0003',
                    textShadowOffset:{width: 2, height: 2},
                    textShadowRadius: 3,}} >{ ward }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginLeft: 30,
        marginTop: 40
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor:'#0003',
        textShadowOffset:{width: 2, height: 2},
        textShadowRadius: 5,
    },
})