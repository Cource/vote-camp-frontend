import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Member } from "../../model/houses";
import AddDetails from "../../components/addDetails";


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
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    detailsItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        paddingBottom: 15,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
})