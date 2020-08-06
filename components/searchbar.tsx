import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios';
import { server, House } from '../model/houses';
import { useNavigation } from '@react-navigation/native';
import Barcode from "./barcode";

export default ()=>{
    const [ value , onValueChange ] = useState('Search..')
    const [ results, createResults ] = useState([])
    const [barcodeShown, setBarcodeShown] = useState(false)
    const [ search, doSearch ] = useState(false)
    function Search(){
        doSearch(!search)
    }

    const navigation = useNavigation()

    useEffect(()=>{
        if (value !== ''){
            Axios.get(server + '/voters', {
                params:{
                    search: value
                }
            }).then((res)=> {createResults(res.data)})
        } else createResults([])
    }, [search])

    return(
        <LinearGradient colors={['#5ABDFF', '#88E7FF']} style={styles.searchBarBg} >
            <ScrollView style={{ maxHeight: 400 }} >
                {
                    results.map((result:House)=>{
                        return(
                            <TouchableOpacity
                                style={[styles.searchBg, { marginBottom: 10, backgroundColor: '#0006' }]}
                                onPress={ ()=> {
                                    navigation.navigate('detail',{
                                        houseName: result.houseName,
                                        houseNumber: result.houseNumber,
                                    })
                                } }
                            >
                                <Text style={{ color: 'white' }}>{ result.houseName }</Text>
                                <Text style={{ color: 'white' }}>{ result.houseNumber }</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
            <View style={styles.searchBg}>
                <TextInput
                    value={value}
                    onChangeText={(text)=> onValueChange(text)}
                    style={{ minWidth: '70%' }}
                    onSubmitEditing={ Search }
                />
                <TouchableOpacity onPress={()=> Search() }>
                    <Feather name="search" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={ ()=> setBarcodeShown(true) } >
                    <Feather name="camera" size={24} color="black" />
                </TouchableOpacity>
            </View>
            {
                barcodeShown
                ?
                <Barcode valueSetter={onValueChange} onScanned={ ()=> setBarcodeShown(false) } />
                :null
            }
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    searchBarBg: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 15,
        position: 'absolute',
        bottom: 0,
        minWidth: '100%',
    },
    searchBg: {
        backgroundColor: '#fffa',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
})