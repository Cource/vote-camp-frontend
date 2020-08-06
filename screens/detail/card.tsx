import { Fontisto } from "@expo/vector-icons";
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { Member } from "../../model/houses";
import { parties, party } from "./parties";


const ButtonContainer = (props:{ hidden: boolean })=>{
    if (props.hidden){
        return(
            <View style={ styles.buttonContainer }>
                <View style={{ flexDirection: 'row' }}>
                    {
                        parties.map((party:party)=>{
                            return(
                                <TouchableOpacity
                                    onPress={ ()=> {}}
                                    key={ party.key as string }
                                    style={[ styles.button, { backgroundColor: party.color } as ViewStyle ]}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>{party.key}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <View>
                    <TouchableOpacity style={[ styles.button ]} >
                        <Fontisto name="paralysis-disability" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    else return null
}

export default (props:Member)=>{
    const [ hidden, setHide ] = useState(true)

    return(
        <View style={{ marginBottom: 10 }}>
            <TouchableOpacity style={[ styles.detailsItem ]} onPress={ ()=> setHide(!hidden) } >
                <View>
                    <View>
                        <Text style={ styles.title } >Name</Text>
                        <Text>{ props.name }</Text>
                    </View>
                    <View>
                        <Text style={ styles.title } >Guardian</Text>
                        <Text>{ props.guardian }</Text>
                    </View>
                </View>
                <View>
                    <View>
                        <Text style={ styles.title } >Voters Id</Text>
                        <Text>{ props.voterId } </Text>
                    </View>
                    <View>
                        <Text style={ styles.title } >Sex/Age</Text>
                        <Text>{ props.gender }</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <ButtonContainer hidden={ hidden } />
        </View>
    );
}

const styles = StyleSheet.create({
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
    },
    detailsItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        paddingBottom: 15,
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        elevation: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
})