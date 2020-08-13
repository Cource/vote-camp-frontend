import React, { useEffect, useState } from "react"
import { View, Text, AsyncStorage, StyleSheet } from "react-native"
import { TextInput, TouchableOpacity, ScrollView } from "react-native-gesture-handler"
import { Feather } from '@expo/vector-icons';
import Axios from 'axios';
import { server, House } from '../../model/houses';
import { useNavigation } from "@react-navigation/native";


export default ()=>{
    const navigation = useNavigation()

    const [ward, setWard] = useState<null|string>('')
    const [query, setQuery] = useState('Search')
    const [search, doSearch] = useState(false)
    const [results, setResults] = useState([])

    useEffect(()=>{
        (async()=>{
            setWard(await AsyncStorage.getItem('ward'))
        })()
    }, [])

    useEffect(()=>{
        if (query !== ''){
            Axios.get(server + '/voters', {
                params:{
                    search: query
                }
            }).then((res)=> {setResults(res.data)})
        } else setResults([])
    }, [search])

    return(
        <View style={styles.container} >
            <View style={styles.header}>
                <Text style={styles.headerText} >Search</Text>
                <Text>{ ward }</Text>
            </View>
            <View style={styles.searchBar}>
                <TextInput
                    value={query}
                    onChangeText={(text)=> setQuery(text)}
                    style={{ flexGrow: 1 }}
                    onSubmitEditing={ ()=> doSearch(!search) }
                />
                <TouchableOpacity onPress={ ()=> doSearch(!search) } >
                    <Feather name="search" size={25} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.resultContainer} >
                {
                    results.map(({ houseName, houseNumber }:House)=>{
                        return(
                            <TouchableOpacity
                                style={styles.result}
                                key={houseNumber}
                                onPress={()=>{
                                    navigation.navigate('detail',{
                                        houseName: houseName,
                                        houseNumber: houseNumber,
                                    })
                                }}
                            >
                                <Text>{ houseName }</Text>
                                <Text>{ houseNumber }</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40
    },
    header: {
        marginLeft: 30
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    searchBar: {
        backgroundColor: "#dbdbdb",
        borderRadius: 10,
        padding: 10,
        marginTop: 30,
        marginHorizontal: 30,
        flexDirection: 'row',
    },
    resultContainer: {
        paddingHorizontal: 30,
        marginBottom: 150,
        marginTop: 10,
    },
    result: {
        borderStyle: "solid",
        borderColor: "#dee8e8",
        borderWidth: 0,
        borderBottomWidth: 2, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
})