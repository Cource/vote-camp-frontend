import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { getWardsAPI, reqOtpAPI, verifyOtpAPI } from '../../api/v1';
import ConfirmBtn from '../../components/ConfirmBtn';
import { Feather } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../App';
import { lwrap } from '../../model/language';

type props = StackScreenProps<StackParamList, 'signIn'>

export default ({ navigation }: props) => {

    const [ phone, onPhoneChange ] = useState('')
    const [otp, onOtpChange] = useState('')
    const [page, setPage] = useState(0)
    const [border, setBorder] = useState({})
    const [loading, setLoading] = useState(false)
    const [netErr, setNetErr] = useState(false)
    
    function inputErr() {
        setBorder({ borderWidth: 2 })
    }
    function resetErr() {
        setBorder({ borderWidth: 0 })
    }

    useEffect(() => {
        AsyncStorage.getItem('auth')
            .then((res) => {
                if (res !== null) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'tabs' }]
                    })
                }
            })
    }, [])
    useEffect(() => {
        if (netErr) {
            setTimeout(() => {
                setNetErr(false)
            }, 6000)
        }
    }, [netErr])

    return(
        <View style={{ justifyContent: 'space-between', flex: 1 }}>
            <View style={styles.top}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: "center", marginBottom: 40 }}
                    onPress={() => { setPage(0) }}
                >
                    {page !== 0 ?
                        <Feather name="chevron-left" size={30} color="#555" />
                        : null
                    }
                    <Text style={styles.header}>{lwrap('Login')}</Text>
                </TouchableOpacity>
                {page === 0 ?
                    <>
                        <Text style={[styles.header, { fontSize: 20 }]}>{lwrap('Phone Number')}</Text>
                        <TextInput value={phone} onChangeText={onPhoneChange} style={[styles.input, border]}
                            keyboardType='phone-pad'
                            maxLength={10} />
                    </>
                    :
                    <>
                        <Text style={[styles.header, { fontSize: 20 }]} >{lwrap('Verification Code')}</Text>
                        <TextInput value={otp} onChangeText={onOtpChange} style={[styles.input, border]} placeholder={lwrap("Enter the One Time Pin")}
                            keyboardType='numeric'
                            maxLength={6} />
                    </>
                }
                {
                    loading ?
                        <ActivityIndicator size="large" />
                        : null
                }
                {
                    netErr ?
                        <Text style={{ color: '#f55', alignSelf: 'center' }}>{lwrap('Network Error')}</Text>
                        : null
                }
            </View>
            <ConfirmBtn onPress={() => {
                if (page === 0) {
                    if (/[0-9]{10}/.test(phone)) {
                        setLoading(true)
                        reqOtpAPI(phone)
                            .then((res) => {
                                if (!res.data.message) {
                                    resetErr()
                                    setNetErr(false)
                                    setPage(1)
                                }
                            })
                            .catch((err) => err.response.status === 400 ? inputErr() : null)
                            .catch(() => setNetErr(true))
                            .finally(() => setLoading(false))
                    } else {
                        inputErr()
                    }
                } else {
                    if (/[0-9]{6}/.test(otp)) {
                        verifyOtpAPI(phone, otp)
                            .then(async (res) => {
                                AsyncStorage.setItem('auth', res.data.token)
                                AsyncStorage.setItem('uid', res.data.id.toString())
                                AsyncStorage.setItem('wardId', res.data.wardId.toString())
                                AsyncStorage.setItem('cityId', res.data.cityId.toString())
                                AsyncStorage.setItem('districtId', res.data.districtId.toString())
                                const wards = await getWardsAPI(res.data.districtId, res.data.cityId)
                                for (let ward of wards.data) {
                                    if (ward.id === res.data.wardId) {
                                        await AsyncStorage.setItem('ward', ward.name)
                                    }
                                }
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'tabs' }]
                                })
                            })
                            .catch((err) => err.response.status === 400 ? inputErr() : null)
                            .catch(() => setNetErr(true))
                    } else {
                        inputErr()
                    }
                }
            }} position="center" icon={page === 0 ? false : true} text={page === 0 ? lwrap("Request OTP") : lwrap("Verify OTP")} />
        </View>
    )
}

const styles = StyleSheet.create({
    top: {
        marginVertical: 40,
        marginHorizontal: 25,
    },
    header: {
        marginLeft: 5,
        fontSize: 50,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#ddd',
        borderColor: '#f99',
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    cta: {
        paddingHorizontal: 25,
        paddingVertical:15,
        marginBottom: 30,
        alignItems: 'center',
        borderRadius: 100
    }
})