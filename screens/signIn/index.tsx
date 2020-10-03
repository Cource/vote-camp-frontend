import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { getWardsAPI, reqOtpAPI, verifyOtpAPI } from '../../api/v1';
import { ConfirmBtn } from '../../components';
import { Feather } from '@expo/vector-icons';

export default ({ navigation }) => {

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
                    navigation.navigate('tabs')
                }
            })
    }, [])
    useEffect(() => {
        if (netErr) {
            setTimeout(() => {
                setNetErr(false)
            }, 10000)
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
                    <Text style={styles.header}>Login</Text>
                </TouchableOpacity>
                {page === 0 ?
                    <>
                        <Text style={[styles.header, { fontSize: 20 }]}>Phone Number</Text>
                        <TextInput value={phone} onChangeText={onPhoneChange} style={[styles.input, border]} />
                    </>
                    :
                    <>
                        <Text style={[styles.header, { fontSize: 20 }]} >Verification Code</Text>
                        <TextInput value={otp} onChangeText={onOtpChange} style={[styles.input, border]} placeholder="Enter the One Time Pin" />
                    </>
                }
                {
                    loading ?
                        <ActivityIndicator size="large" />
                        : null
                }
                {
                    netErr ?
                        <Text style={{ color: '#f55', alignSelf: 'center' }}>Network Error</Text>
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
                                const wards = await getWardsAPI(res.data.districtId, res.data.cityId)
                                for (let ward of wards.data) {
                                    if (ward.id === res.data.wardId) {
                                        await AsyncStorage.setItem('ward', ward.name)
                                    }
                                }
                                navigation.navigate('tabs')
                            })
                    } else {
                        inputErr()
                    }
                }
            }} position="center" icon={page === 0 ? false : true} text={page === 0 ? "Request OTP" : "Verify OTP"} />
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