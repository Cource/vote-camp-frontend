import AsyncStorage from "@react-native-community/async-storage";
import { StackScreenProps } from '@react-navigation/stack';
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getCitiesAPI, getWardsAPI } from '../../api/v1';
import { StackParamList } from "../../App";
import { ConfirmBtn } from "../../components";
import { districts } from "../../model/landing";
import OptionPicker from './optionPicker';

type Props = StackScreenProps<StackParamList, 'landing'>



export default ({ navigation }:Props)=>{
    const [ district, setDistrict ] = useState('')
    const [ city, setCity ] = useState('')
    const [ ward, setWard ] = useState('')
    const [ cities, setCities ] = useState([])
    const [ wards, setWards ] = useState([])
    
    const initial1 = useRef(false)
    useEffect(()=>{
        if (initial1.current) {
            initial1.current = false
        } else {
            getCitiesAPI(district).then((res)=> setCities(res.data) )
        }
    }, [district])
    
    const initial2 = useRef(false)
    useEffect(()=>{
        if (initial2.current) {
            initial2.current = false
        } else {
            getWardsAPI(district, city).then((res)=> setWards(res.data) )
        }
    }, [city])

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.header}>Campaign Details</Text>
                <Text style={styles.party}>LDF</Text>
            </View>
            <View>
                <OptionPicker title='District' list={districts} state={ district } changeState={ setDistrict } titleStyle={{ marginBottom: 10 }} />
                <OptionPicker title='City/Town' list={cities} state={ city } changeState={ setCity } titleStyle={{ marginBottom: 10 }} style={{ marginTop: 20 }} />
                <OptionPicker title='Ward' list={wards} state={ ward } changeState={ setWard } titleStyle={{ marginBottom: 10 }} style={{ marginTop: 20 }} />
            </View>
            <ConfirmBtn
                onPress={() => {
                    navigation.reset({
                        index: 1,
                        routes: [{ name: 'tabs' }]
                    })
                    AsyncStorage.setItem('district', district)
                    AsyncStorage.setItem('city', city)
                    AsyncStorage.setItem('ward', ward)
                }}
                icon={true}
                text="Set Location"
            />
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
    cta: {
        paddingHorizontal: 25,
        paddingVertical:15,
        marginBottom: 30,
        alignItems: 'center',
        borderRadius: 100
    },
})