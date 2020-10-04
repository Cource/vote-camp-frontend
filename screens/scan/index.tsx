import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { searchAPI } from '../../api/v1';
import Barcode from '../../components/barcode';

export default ()=>{
    const navigation = useNavigation()

    const [ward, setWard] = useState<null|string>('')
    const [voterId, setVoterId] = useState('')
    const [invalid, setInvalid] = useState(false)

    useEffect(()=>{
        voterId!==''?
            searchAPI(voterId).then((res)=> {
                navigation.navigate('detail', {
                    houseName: res.data[0].houseName,
                    houseNumber: res.data[0].houseNumber,
                })
            })
            .catch(()=> {
                setInvalid(true)
                setTimeout(()=>{
                    setInvalid(false)
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
            <StatusBar style="light" backgroundColor="#0003" hidden={invalid} />
            {
                invalid?
                <View style={{ position: "absolute", top: 0, right: 0, left: 0, height: 24, backgroundColor: '#FF4D4D', justifyContent: "center", alignItems: 'center' }} >
                    <Text style={{ color: 'white' }} >Invalid Voter ID</Text>
                </View>
                :null
            }
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