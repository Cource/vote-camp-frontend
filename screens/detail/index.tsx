import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { Ionicons, Feather, Fontisto } from '@expo/vector-icons';
import { StackParamList } from "../../App";
import SearchBar from "../../components/searchbar";
import { Member } from "../../model/houses";
import { LinearGradient } from 'expo-linear-gradient';

type Props = StackScreenProps<StackParamList, 'detail'>

const Detail = (props:Member)=>{
    const [ hidden, setHide ] = useState(false)
    if (hidden) return null
    else return(
        <View>
            <View style={ styles.detailsItem }>
                <View>
                    <Text style={ styles.detailsText }> { props.name } </Text>
                    <View>
                        <Text style={ detailStyles.title } >Guardian</Text>
                        <Text>{ props.guardian }</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'space-between' }}>
                    <Text style={ styles.detailsText }> { props.id } </Text>
                    <View>
                        <Text style={ detailStyles.title } >Sex/Age</Text>
                        <Text>{ props.s_d }</Text>
                    </View>
                </View>
            </View>
            <View style={ detailStyles.buttonContainer }>
                <TouchableOpacity onPress={ ()=> setHide(true) } style={[ detailStyles.button ]}>
                <Fontisto name="paralysis-disability" size={25} color="white" />
                </TouchableOpacity>
            </View>
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

const ConfirmBtn = ()=>{
    return(
        <TouchableOpacity style={{ flexDirection: "row", paddingBottom: 20, paddingRight: 20, alignSelf: "flex-end" }}>
            <LinearGradient colors={['#5ABDFF', '#88E7FF']} style={ styles.confirmBtn }>
                <Feather name="check-circle" size={35} color="white" />
                <Text style={{ fontSize: 25, color: "white", marginHorizontal: 10, fontWeight:"bold" }}>Confirm</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default ({ route, navigation }:Props)=>{
    const { name } = route.params
    const { members } = route.params
    return(
        <View style={styles.screen}>
            <View>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={[styles.header, { justifyContent: "flex-start", marginTop: 0, marginHorizontal: 0 }]}
                        onPress={()=>{navigation.navigate("home")}}
                    >
                            <Ionicons name="ios-arrow-back" size={30} color="black" />
                            <Text style={styles.name}>{ name }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="edit" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.details}>
                    <View style={styles.detailsHeader}>
                        <Text style={styles.detailsHeaderText}>Name</Text>
                        <Text style={styles.detailsHeaderText}>Voter Id</Text>
                    </View>
                    {
                        members.map((member)=> {
                            return (
                                <Detail name={ member.name } id={ member.id } guardian={ member.guardian } s_d={ member.s_d } key={ member.id as string } />
                            )
                        })
                    }
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
        marginBottom: 200,
    },
    detailsItem: {
        justifyContent: "space-between",
        flexDirection: "row",
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
    detailsHeaderText: {
        fontWeight: "700",
        color: "#555",
        fontSize: 25,
        marginBottom: 10,
    },
    detailsText: {
        fontSize: 15,
    },
    confirmBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 100,
    }
})