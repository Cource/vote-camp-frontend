import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { AsyncStorage, StyleSheet, Text, View, ActivityIndicator, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { searchAPI } from '../../api/v1';
import { House } from '../../Design/voter';
import { localize } from '../../Design/language'

export default () => {
    const navigation = useNavigation()

    const [ward, setWard] = useState<null | string>('')
    const [query, setQuery] = useState('')
    const [search, doSearch] = useState(false)
    const [results, setResults] = useState([])
    const [isLoading, setLoading] = useState(true)

    const searched = useRef(false)

    useEffect(() => {
        (async () => {
            setWard(await AsyncStorage.getItem('ward'))
        })()
    }, [])

    useEffect(() => {
        if (query !== '' && ward !== null) {
            searchAPI(query).then((res) => setResults(res.data)).finally(() => setLoading(false))
        }
        else {
            setResults([])
            setLoading(false)
        }
    }, [search])

    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <Text style={styles.headerText} >{localize('Search')}</Text>
                <Text>{ward}</Text>
            </View>
            <View style={styles.searchBar}>
                <TextInput
                    placeholder={localize("Name, House name")}
                    placeholderTextColor="#888"
                    value={query}
                    onChangeText={(text) => setQuery(text)}
                    style={{ flexGrow: 1 }}
                    onSubmitEditing={() => { doSearch(!search); setLoading(true) }}
                />
                <TouchableOpacity onPress={() => { doSearch(!search); setLoading(true); searched.current = true }} >
                    <Feather name="search" size={25} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.resultContainer} >
                {
                    isLoading ?
                        <ActivityIndicator size='large' />
                        :
                        results.length > 0 ?
                            results.map(({ houseName, houseNumber }: House) => {
                                return (
                                    <TouchableOpacity
                                        style={styles.result}
                                        key={houseNumber}
                                        onPress={() => {
                                            navigation.navigate('detail', {
                                                houseName: houseName,
                                                houseNumber: houseNumber,
                                            })
                                        }}
                                    >
                                        <Text>{houseName}</Text>
                                        <Text>{houseNumber}</Text>
                                    </TouchableOpacity>
                                )
                            })
                            :
                            searched.current ?
                                <Text style={{ alignSelf: "center" }}>No Results Found</Text>
                                : null
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