import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StackParamList } from '../../App'
import { Ionicons, Feather } from "@expo/vector-icons"

type props = StackScreenProps<StackParamList, 'profile'>

export default ({ navigation }: props) => {
    return (
        <View style={{ marginVertical: 40, marginHorizontal: 20, justifyContent: 'space-between', flex: 1 }}>
            <View style={{ alignItems: 'stretch' }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                    style={{ flexDirection: 'row', alignItems: "center", marginBottom: 20 }}
                >
                    <Ionicons name="ios-arrow-back" size={30} color="#555" />
                    <Text style={{ fontSize: 36, fontWeight: 'bold', marginLeft: 10 }}>Profile</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 30, fontWeight: "bold", alignSelf: "center", marginVertical: 30 }} >Manoj k Narayanan</Text>
                <View style={styles.item}>
                    <View style={{ flexDirection: 'row' }}>
                        <Feather name="phone" size={20} color="#555" style={{ marginRight: 10 }} />
                        <Text style={styles.title}>Phone</Text>
                    </View>
                    <Text>9855675886</Text>
                </View>
                <View style={styles.item}>
                    <View style={{ flexDirection: 'row' }}>
                        <Feather name="map-pin" size={20} color="#555" style={{ marginRight: 10 }} />
                        <Text style={styles.title}>Ward</Text>
                    </View>
                    <Text>028-Aruvithura</Text>
                </View>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#f67', justifyContent: "center", padding: 15, flexDirection: 'row', borderRadius: 10 }} >
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