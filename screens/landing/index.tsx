import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Picker, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Option, districts } from "../../model/landing";
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from "../../App";
import Axios from 'axios';
import { server } from '../../model/houses';

type Props = StackScreenProps<StackParamList, 'landing'>

const OptionPicker = (props:Option)=>{
    return (
        <View>
            <Text style={styles.optionTitle}>{props.title}</Text>
            <View style={{ borderRadius: 10, borderColor: "#555", borderStyle: "solid", borderWidth: 2 }}>
                <Picker 
                    selectedValue={props.state as string}
                    onValueChange={(itemValue)=> {
                        props.changeState
                        ?
                        props.changeState(itemValue)
                        : null
                    }}
                    style={{ height: 50, width: 300 }}
                    >
                    {
                        props.list.map((item)=>{
                            return(
                                <Picker.Item key={item as string} label={item as string} value={item as string}></Picker.Item>
                            )
                        })
                    }
                </Picker>
            </View>
        </View>  
    )
}

export default ({ navigation }:Props)=>{
    const [ district, setDistrict ] = useState('')
    const [ city, setCity ] = useState('')
    const [ ward, setWard ] = useState('')
    const [ cities, setCities ] = useState([])
    const [ wards, setWards ] = useState([])

    useEffect(()=>{
        Axios.get(server + '/cities', {
            params: {
                district: district,
            }
        }).then((res)=> setCities(res.data) )
    }, [district])
    
    useEffect(()=>{
        Axios.get(server + '/wards', {
            params: {
                district: district,
                city: city,
            }
        }).then((res)=> setWards(res.data) )
    }, [city])

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.header}>Campaign Details</Text>
                <Text style={styles.party}>Kerala Janapaksham</Text>
            </View>
            <View>
                <OptionPicker title='District' list={districts} state={ district } changeState={ setDistrict } />
                <OptionPicker title='City/Town' list={cities} state={ city } changeState={ setCity } />
                <OptionPicker title='Ward' list={wards} state={ ward } changeState={ setWard } />
            </View>
            <LinearGradient
                colors={['#5ABDFF', '#88E7FF']}
                style={styles.cta}>
                <TouchableOpacity onPress={()=> {
                    navigation.navigate('home')
                    AsyncStorage.setItem('district', district)
                    AsyncStorage.setItem('city', city)
                    AsyncStorage.setItem('ward', ward)
                }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 20,
                        fontWeight: "700",
                    }}>Start Campaign</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      header: {
        fontSize: 35,
        fontWeight: "700",
        marginTop: 40
    },
    party: {
        alignSelf: 'flex-end',
        fontSize: 20,
        fontWeight: '700'
    },
    optionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
    },
    cta: {
        paddingHorizontal: 25,
        paddingVertical:15,
        marginBottom: 30,
        alignItems: 'center',
        borderRadius: 100
    },
})