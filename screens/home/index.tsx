import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ArcProgress from '../../components/animatedArcProgress'
import { Easing } from 'react-native-reanimated';
import { timing } from "react-native-redash";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { House, houses } from "../../model/houses";
import { useNavigation } from '@react-navigation/native';

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

const HouseListItem = (props:House)=>{
    const navigation = useNavigation()
    return(
        <TouchableOpacity style={ styles.houseListItem } onPress={(()=> navigation.navigate('detail'))} >
            <Text style={styles.listText}>{ props.name }</Text>
            <Text style={styles.listText}>{ props.number }</Text>
        </TouchableOpacity>
    )
}

const HouseList = ()=>{
    return(<>
            {
                houses.map((house)=> {
                    return(
                        <HouseListItem
                            number={ house.number }
                            name={ house.name }
                            members={ house.members }
                            key={ house.number as number }
                        />
                    )
                })
            }
    </>)
}


export const Home = ()=>{
    const config = {
        duration: 1000,
        from: 0,
        to: 0.4,
        easing: Easing.bezier(0.5, 1, 0.89, 1),
    }
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.header}>Campaign Progress</Text>
                <Text style={styles.subHeader}>Idukki</Text>
            </View>
            <View style={{ alignSelf: "center", alignItems: "center", justifyContent: 'center', marginTop: 10 }}>
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
            <View style={[styles.houseListItem, styles.listHeader]}>
                <Text style={[styles.listHeaderText, styles.listText]}>Housename</Text>
                <Text style={[styles.listHeaderText, styles.listText]}>House number</Text>
            </View>
            <ScrollView>
                <HouseList/>
            </ScrollView>
            <SearchBar/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
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
    },
    houseListItem: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginHorizontal: 20,
        paddingVertical: 5,
        marginBottom: 10,
        justifyContent: "space-between",
        flexGrow: 0,
        elevation: 3,
        backgroundColor: "#FFF",
        borderRadius: 6,
    },
    listHeader:{
        marginBottom: 10,
        elevation: 0,
        backgroundColor: "#0000"
    },
    listHeaderText: {
        fontWeight: "bold"
    },
    listText:{
        fontSize: 20,
    }
})