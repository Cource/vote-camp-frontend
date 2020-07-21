import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ArcProgress from '../../components/animatedArcProgress'

const SearchBar = ()=>{
    const [value , onValueChange] = useState('Search for housename..')
    return(
        <LinearGradient colors={['#5ABDFF', '#88E7FF']} style={styles.searchBarBg} >
            <View style={styles.searchBg}>
                <TextInput
                    value={value}
                    onChangeText={(text)=> onValueChange(text)}
                />
            </View>
        </LinearGradient>
    )
}

export const Home = ({  })=>{
    return(
        <View style={styles.container}>
            <View style={{ flexDirection: "column" }}>
                <Text style={styles.header}>Campaign Progress</Text>
                <Text style={styles.subHeader}>Idukki</Text>
            </View>
            <SearchBar/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
    },
    header: {
        fontSize: 35,
        fontWeight: "700",
        paddingLeft: 30,
        paddingTop: 40,
    },
    subHeader: {
        fontSize: 20,
        fontWeight: "600",
        paddingLeft: 32
    },
    searchBarBg: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    searchBg: {
        backgroundColor: '#fffa',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10
    }
})