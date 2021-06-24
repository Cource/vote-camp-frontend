import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Alert, Linking } from 'react-native'
import { StackParamList } from '../../../App'
import { Feather } from "@expo/vector-icons"
import AsyncStorage from '@react-native-community/async-storage'
import { profileAPI } from '../../api/v1'
import { Picker } from '@react-native-community/picker'
import { localize } from '../../Design/language'

type props = StackScreenProps<StackParamList, 'profile'>

export default ({ navigation }: props) => {
    const initial = useRef(0)

    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [ward, setWard] = useState('')
    const [lang, setLang] = useState('')

    useEffect(() => {
        if (initial.current <= 1) {
            initial.current++
        } else {
            AsyncStorage.setItem('lang', lang)
            Alert.alert(`Language set to ${lang}`, 'Restart the app to see the changes in effect')
        }
    }, [lang])

    useEffect(() => {
        profileAPI()
            .then(({ data }) => {
                setName(data.name)
                setPhone(data.phone)
            })
            .finally(() => setLoading(false))
        AsyncStorage.getItem('ward')
            .then((ward) => setWard(ward as string))
        AsyncStorage.getItem('lang')
            .then((res) => {
                res && setLang(res)
            })
    }, [])

    return (
        <View style={{ marginTop: 50, marginBottom: 20, justifyContent: 'space-between', flex: 1 }}>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
                style={{ flexDirection: 'row', alignItems: "center", marginLeft: 20 }}
            >
                <Feather name="chevron-left" size={30} color="#555" />
                <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 10 }}>{localize('Profile')}</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
                {loading && <ActivityIndicator size='large' style={{ marginBottom: -75, marginTop: 40 }} />}
                <Text style={{ fontSize: 35, fontWeight: "bold", alignSelf: "center", marginVertical: 40 }} >{name}</Text>
                <View style={styles.item}>
                    <Feather name="phone" size={24} color="black" style={{ marginRight: 10 }} />
                    <View>
                        <Text style={styles.title}>{phone}</Text>
                        <Text style={styles.subtitle}>{localize('Phone number used to login to the app')}</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <Feather name="map-pin" size={24} color="black" style={{ marginRight: 10 }} />
                    <View>
                        <Text style={styles.title}>{ward}</Text>
                        <Text style={styles.subtitle}>{localize('The ward you are working in')}</Text>
                    </View>
                </View>
                <View style={[styles.item, { justifyContent: "space-between" }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Feather name="globe" size={24} color="black" style={{ marginRight: 10 }} />
                        <View>
                            <Text style={styles.title}>{localize('Language')}</Text>
                            <Text style={styles.subtitle}>{localize('Language used in the app')}</Text>
                        </View>
                    </View>
                    {lang ?
                        <Picker
                            selectedValue={lang}
                            onValueChange={(value) => setLang(value.toString())}
                            style={{ height: 50, width: 120 }}
                            mode='dropdown'
                        >
                            <Picker.Item value='en' label='English' />
                            <Picker.Item value='mal' label='മലയാളം' />
                        </Picker>
                        : null
                    }
                </View>
                <TouchableOpacity style={styles.item}
                    onPress={() => Linking.openURL('https://www.virtualbull.org/votecamp/privacypolicy')}
                >
                    <Feather name="paperclip" size={24} color="black" style={{ marginRight: 10 }} />
                    <View>
                        <Text style={styles.title}>{localize('Terms and conditions')}</Text>
                        <Text style={styles.subtitle}>{localize('Things that You need to know')}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}
                    onPress={() => Linking.openURL('https://www.virtualbull.org/votecamp/help')}
                >
                    <Feather name="help-circle" size={24} color="black" style={{ marginRight: 10 }} />
                    <View>
                        <Text style={styles.title}>{localize('Support')}</Text>
                        <Text style={styles.subtitle}>{localize('Get help from us')}</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity
                onPress={() => {
                    AsyncStorage.multiRemove(['auth', 'ward', 'wardId', 'uid'])
                        .then(() => navigation.reset({
                            index: 0,
                            routes: [{ name: 'signIn' }]
                        }))
                }}
                style={{ backgroundColor: '#f67', justifyContent: "center", padding: 15, flexDirection: 'row', borderRadius: 10, marginHorizontal: 20 }}
            >
                <Feather name="log-out" size={24} color="white" style={{ marginRight: 10 }} />
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }} >{localize('Logout')}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        borderRadius: 10
    },
    title: {
        fontSize: 18
    },
    subtitle: {
        color: '#666',
        fontSize: 12
    }
})