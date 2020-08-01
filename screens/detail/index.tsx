import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { Ionicons, Feather, Fontisto } from '@expo/vector-icons';
import { StackParamList } from "../../App";
import SearchBar from "../../components/searchbar";
import { Member, server } from "../../model/houses";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Axios from "axios";

type Props = StackScreenProps<StackParamList, 'detail'>

interface party {
    key: String,
    color: String,
    image: String,
}

const parties: Array<party> = [
    {
        key: 'LDF',
        color: '#f55',
        image: '',
    },
    {
        key: 'UDF',
        color: '#58f',
        image: '',
    },
    {
        key: 'BJP',
        color: '#fa5',
        image: '',
    },
    {
        key: 'NOTA',
        color: '#887',
        image: ''
    }
]


const ButtonContainer = (props)=>{
    const [ disabled, setAbility ] = useState(false)

    if (!props.hidden){
        return(
            <View style={ detailStyles.buttonContainer }>
                <View style={{ flexDirection: 'row' }}>
                    {
                        parties.map((party:party)=>{
                            return(
                                <TouchableOpacity onPress={ ()=> props.setHide({ backgroundColor:'#ddd', borderRadius: 10 }) } key={ party.key as string } style={[ detailStyles.button, { backgroundColor: party.color } ]}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>{party.key}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <View>
                    <TouchableOpacity style={[ detailStyles.button ]} >
                        <Fontisto name="paralysis-disability" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    else return null
}

const Detail = (props:Member)=>{
    const [ hidden, setHide ] = useState({})

    return(
        <View style={{ marginBottom: 10 }}>
            <TouchableOpacity style={[ styles.detailsItem, hidden ]} onPress={ ()=> setHide({}) } >
                <View>
                    <View>
                        <Text style={ detailStyles.title } >Name</Text>
                        <Text>{ props.name }</Text>
                    </View>
                    <View>
                        <Text style={ detailStyles.title } >Guardian</Text>
                        <Text>{ props.guardian }</Text>
                    </View>
                </View>
                <View>
                    <View>
                        <Text style={ detailStyles.title } >Voters Id</Text>
                        <Text>{ props.voterId } </Text>
                    </View>
                    <View>
                        <Text style={ detailStyles.title } >Sex/Age</Text>
                        <Text>{ props.gender }</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <ButtonContainer setHide={ setHide } hidden={ Object.keys(hidden).length } />
        </View>
    );
}

const detailStyles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        backgroundColor: '#ddd',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    button: {
        backgroundColor: "#555",
        padding: 10,
        borderRadius: 100,
        marginHorizontal: 5,
        marginVertical: 5,
    }
})

const ConfirmBtn = (props:Props)=>{
    const navigation = useNavigation()
    return(
        <TouchableOpacity onPress={ ()=> navigation.goBack() } style={{ flexDirection: "row", paddingBottom: 20, paddingRight: 20, alignSelf: "flex-end" }}>
            <LinearGradient colors={['#5ABDFF', '#88E7FF']} style={ styles.confirmBtn }>
                <Feather name="check-circle" size={35} color="white" />
                <Text style={{ fontSize: 25, color: "white", marginHorizontal: 10, fontWeight:"bold" }}>Confirm</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default ({ route, navigation }:Props)=>{
    const { houseName } = route.params
    const { houseNumber } = route.params

    const [ members, setMembers ] = useState([])
    useEffect(()=>{
        Axios.get(server + '/familyDetails', {
            params: {
                ward: 'perunnilam',
                houseNumber: houseNumber,
            }
        }).then((res)=>{
            setMembers(res.data)
        })
    }, [])

    return(
        <View style={styles.screen}>
            <View>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={[styles.header, { justifyContent: "flex-start", marginTop: 0, marginHorizontal: 0 }]}
                        onPress={()=>{navigation.navigate("home")}}
                    >
                            <Ionicons name="ios-arrow-back" size={30} color="black" />
                            <Text style={styles.name}>{ houseName }</Text>
                    </TouchableOpacity>
                    <Text style={styles.name} >{ houseNumber }</Text>
                </View>
                <ScrollView style={styles.details}>
                    {
                        members.map((member:Member)=> {
                            return (
                                <Detail name={ member.name } voterId={ member.voterId } guardian={ member.guardian } gender={ member.gender } key={ member.voterId as string } />
                            )
                        })
                    }
                    <View style={{ height: 200 }} />
                </ScrollView>
            </View>
            <View style={{ position: 'absolute', bottom: 0, minWidth: '100%' }}>
                <ConfirmBtn/>
                <SearchBar/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between'
    },
    header: {
        marginTop: 50,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
    },
    name: {
        fontSize: 30,
        fontWeight: "700",
        marginLeft: 10
    },
    details:{
        marginHorizontal: 30,
        marginTop: 30,
        marginBottom: 100,
    },
    detailsItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        elevation: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    detailsHeader: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 5,
    },
    confirmBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 100,
    }
})