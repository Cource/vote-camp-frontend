import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Voter } from "../../model/voter";
import { useNavigation } from '@react-navigation/native';
import { lwrap } from '../../model/language';

export default (props: Voter) => {
    const navigation = useNavigation()
    return(
        <View style={{ marginBottom: 10 }}>
            <TouchableOpacity style={[ styles.detailsItem ]} onPress={ ()=> {
                navigation.navigate('voter', {
                    type: 'detail',
                    name: props.name,
                    guardian: props.guardian,
                    sex: props.gender.split(' / ')[0],
                    age: props.gender.split(' / ')[1],
                    voterId: props.voterId,
                    houseName: props.houseName,
                    houseNumber: props.houseNumber,
                    id: props.id
                })
            }} >
                <View>
                    <View>
                        <Text style={styles.title} >{lwrap('Name')}</Text>
                        <Text>{ props.name }</Text>
                    </View>
                    <View>
                        <Text style={styles.title} >{lwrap('Guardian')}</Text>
                        <Text>{ props.guardian }</Text>
                    </View>
                </View>
                <View>
                    <View>
                        <Text style={styles.title} >{lwrap('Voter ID')}</Text>
                        <Text>{ props.voterId } </Text>
                    </View>
                    <View>
                        <Text style={styles.title} >{lwrap('Sex / Age')}</Text>
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