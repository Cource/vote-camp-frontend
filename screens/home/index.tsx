import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ArcProgress from '../../components/animatedArcProgress'
import {Easing} from 'react-native-reanimated';
import { timing } from "react-native-redash";

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
    const config = {
        duration: 1000,
        from: 0,
        to: 0.4,
        easing: Easing.bezier(0.5, 1, 0.89, 1),
    }
    return(
        <View style={styles.container}>
            <View style={{ flexDirection: "column" }}>
                <Text style={styles.header}>Campaign Progress</Text>
                <Text style={styles.subHeader}>Idukki</Text>
            </View>
            <View style={{ alignSelf: "center", flexDirection: 'column', alignItems: "center", justifyContent: 'center' }}>
                <ArcProgress progress={timing(config)} />
                <View style={{position: "absolute", alignItems: "center"}}>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 40,
                    }}>{323}</Text>
                    <Text style={{fontSize: 20, marginTop: 10}}>{1002}</Text>
                    <Text style={{color: '#888'}}>Houses</Text>
                </View>
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
        padding: 15,
    },
    searchBg: {
        backgroundColor: '#fffa',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10
    }
})