import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { searchAPI } from '../../api/v1';
import { Barcode } from '../../components';

export default ()=>{
    const navigation = useNavigation()

    const [ward, setWard] = useState<null|string>('')
    const [voterId, setVoterId] = useState('')

    useEffect(()=>{
        voterId!==''?
            searchAPI(voterId).then((res)=> {
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