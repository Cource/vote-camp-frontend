import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { StackParamList } from '../../App'
import { Feather } from "@expo/vector-icons"
import AsyncStorage from '@react-native-community/async-storage'
import { profileAPI } from '../../api/v1'

type props = StackScreenProps<StackParamList, 'profile'>

export default ({ navigation }: props) => {
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [ward, setWard] = useState<null | string>('')

    useEffect(() => {
        profileAPI()
            .then(({ data }) => {
                setName(data.name)
                setPhone(data.phone)
            })
            .finally(() => setLoading(false))
        AsyncStorage.getItem('ward')
            .then((ward) => {
                setWard(ward)
            })
    }, [])

    return (
        <View style={{ marginVertical: 40, marginHorizontal: 20, justifyContent: 'space-between', flex: 1 }}>
            <View style={{ alignItems: 'stretch' }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                    style={{ flexDirection: 'row', alignItems: "center", marginBottom: 20 }}
                >
                    <Feather name="chevron-left" size={30} color="#555" />
                    <Text style={{ fontSize: 36, fontWeight: 'bold', marginLeft: 10 }}>Profile</Text>
                </TouchableOpacity>
                {loading && <ActivityIndicator size='large' />}
                <Text style={{ fontSize: 30, fontWeight: "bold", alignSelf: "center", marginVertical: 30 }} >{name}</Text>
                <View style={styles.item}>
                    <View style={{ flexDirection: 'row' }}>
                        <Feather name="phone" size={20} color="#555" style={{ marginRight: 10 }} />
                        <Text style={styles.title}>Phone</Text>
                    </View>
                    {loading && <ActivityIndicator size='small' />}
                    <Text>{phone}</Text>
                </View>
                <View style={styles.item}>
                    <View style={{ flexDirection: 'row' }}>
                        <Feather name="map-pin" size={20} color="#555" style={{ marginRight: 10 }} />
                        <Text style={styles.title}>Ward</Text>
                    </View>
                    <Text>{ward}</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => {
                    AsyncStorage.multiRemove(['auth', 'ward', 'wardId', 'uid'])
                        .then(() => navigation.reset({
                            index: 0,
                            routes: [{ name: 'signIn' }]
                        }))
                }}
                style={{ backgroundColor: '#f67', justifyContent: "center", padding: 15, flexDirection: 'row', borderRadius: 10 }}
            >
                <Feather name="log-out" size={24} color="white" style={{ marginRight: 10 }} />
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }} >Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        elevation: 1,
        backgroundColor: '#f9f9f9',
        borderRadius: 10
    },
    title: {
        fontWeight: "bold",
        color: '#555',
        fontSize: 17
    }
})