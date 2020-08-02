import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

export default ()=>{
    const [value , onValueChange] = useState('Search for housename..')
    return(
        <LinearGradient colors={['#5ABDFF', '#88E7FF']} style={styles.searchBarBg} >
            <ScrollView style={{ maxHeight: 400 }} >
                <View style={[styles.searchBg, { marginBottom: 10, backgroundColor: '#0006' }]}>
                    <Text style={{ color: 'white' }}>Plathottam</Text>
                    <Text style={{ color: 'white' }}>120</Text>
                </View>
            </ScrollView>
            <View style={styles.searchBg}>
                <TextInput
                    value={value}
                    onChangeText={(text)=> onValueChange(text)}
                />
                <Feather name="search" size={24} color="black" />
            </View>
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