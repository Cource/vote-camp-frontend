import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from '@react-navigation/native';
import Axios from "axios";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Easing } from 'react-native-reanimated';
import { timing } from "react-native-redash";
import ArcProgress from '../../components/animatedArcProgress';
import SearchBar from "../../components/searchbar";
import { House, server } from "../../model/houses";
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../App';

type Props = StackScreenProps<StackParamList, 'home'>

const HouseListItem = (props:House)=>{
    const navigation = useNavigation()
    return(
        <TouchableOpacity style={ styles.houseListItem }
            onPress={(()=> 
                navigation.navigate('detail',{
                    houseName: props.houseName,
                    houseNumber: props.houseNumber,
                })
            )}
        >
            <Text style={styles.listText}>{ props.houseName }</Text>
            <Text style={styles.listText}>{ props.houseNumber }</Text>
        </TouchableOpacity>
    )
}

const HouseList = ()=>{
    const [ data, setData ] = useState([])
    useEffect(()=>{
            (async ()=>{
                Axios.get(server + '/users', {
                    params: {
                        district: await AsyncStorage.getItem('district'),
                        city: await AsyncStorage.getItem('city'),
                        ward: await AsyncStorage.getItem('ward'),
                    }
                })
                .then((res)=> {setData(res.data)})
            })()
    }, [])
    return(<>
            {
                data.map((house:House)=> {
                return(
                    <HouseListItem
                        houseNumber={ house.houseNumber }
                        houseName={ house.houseName.charAt(0).toUpperCase() +house.houseName.slice(1).toLowerCase() }
                        key={ house.houseNumber as number }
                    />
                )
                })
            }
    </>)
}


export default ({ navigation }:Props)=>{
    const [ progress, setProgress ] = useState(0)
    const [ totalHouses, setTotal ] = useState(0)
    const [ completed, setCompleted ] = useState(0)

    // useEffect(()=>{
    //     (
    //         async ()=>{
    //             Axios.get(server + '/progress', {
    //                 params:{
    //                     ward: await AsyncStorage.getItem('ward')
    //                 }
    //             }).then((res)=>{
    //                 setProgress(res.data.completed / res.data.totalHouses)
    //                 setTotal(res.data.totalHouses)
    //                 setCompleted(res.data.completed)
    //             })
    //         }
    //     )()
    // }, [])

    const config = {
        duration: 1000,
        from: 0,
        to: progress,
        easing: Easing.bezier(0.5, 1, 0.89, 1),
    }

    return(
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: "center", marginTop: 40 }}>
                <View>
                    <Text style={styles.header}>Campaign Progress</Text>
                    <Text style={styles.subHeader}>Poonjar</Text>
                </View>
                <TouchableOpacity onPress={()=>{
                    AsyncStorage.setItem('ward', '')
                    navigation.navigate('landing')
                }}>
                    <Ionicons name="md-exit" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{ alignSelf: "center", alignItems: "center", justifyContent: 'center', marginTop: 20 }}>
                <ArcProgress progress={timing(config)} />
                <View style={{position: "absolute", alignItems: "center"}}>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 40,
                    }}>{completed}</Text>
                    <Text style={{fontSize: 20, marginTop: 10}}>{totalHouses}</Text>
                    <Text style={{color: '#888'}}>Houses</Text>
                </View>
            </View>
            <View style={[styles.houseListItem, styles.listHeader]}>
                <Text style={[styles.listHeaderText, styles.listText]}>Housename</Text>
                <Text style={[styles.listHeaderText, styles.listText]}>House number</Text>
            </View>
            <ScrollView style={{ marginBottom: 70, }} >
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
        fontSize: 30,
        fontWeight: "700",
    },
    subHeader: {
        fontSize: 15,
        fontWeight: "600",
    },
    houseListItem: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginHorizontal: 20,
        paddingVertical: 5,
        marginBottom: 10,
        justifyContent: "space-between",
        flexGrow: 0,
        elevation: 1,
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
        fontSize: 18,
    }
})