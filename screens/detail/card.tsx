import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Voter } from "../../model/voter";
import { useNavigation } from '@react-navigation/native';
import { lwrap } from '../../model/language';
import { Feather } from '@expo/vector-icons';

export default (props: Voter) => {
    const navigation = useNavigation()
    return(
        <View style={{ marginBottom: 10 }}>
            <TouchableOpacity style={[styles.detailsItem, { backgroundColor: props.verified ? '#AEAEAE' : '#fff' }]}
                onPress={() => {
                    props.gender && navigation.navigate('voter', {
                        ...props,
                        type: 'detail',
                        sex: props.gender.split(' / ')[0],
                        age: props.gender.split(' / ')[1],
                })
            }} >
                {props.verified && <Text style={styles.watermark}>Verified</Text>}
                {props.visitCount ? props.visitCount >= 1 && <Text style={styles.visitCount}>{props.visitCount} visits</Text> : null}
                {props.keyVoter && <Feather name="key" size={25} color="#333" style={styles.watermarkKey} />}
                <View>
                    <View style={styles.section}>
                        <Text style={styles.title} >{lwrap('Name')}</Text>
                        <Text style={styles.text}>{props.name}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.title} >{lwrap('Guardian')}</Text>
                        <Text style={styles.text}>{props.guardian}</Text>
                    </View>
                </View>
                <View>
                    <View style={styles.section}>
                        <Text style={styles.title} >{lwrap('Voter ID')}</Text>
                        <Text style={styles.text}>{props.voterId} </Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.title} >{lwrap('Sex / Age')}</Text>
                        <Text style={styles.text}>{props.gender}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        color: '#333'
    },
    text: {
        fontSize: 15,
        color: '#333333'
    },
    watermark: {
        position: 'absolute',
        fontSize: 60,
        fontWeight: 'bold',
        bottom: 0,
        left: 10,
        color: '#333',
        opacity: 0.1
    },
    watermarkKey: {
        position: 'absolute',
        top: 7,
        right: 10,
        opacity: 0.2
    },
    visitCount: {
        position: 'absolute',
        bottom: -10,
        right: 0,
        backgroundColor: '#74deff',
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    section: {
        paddingVertical: 5
    },
    detailsItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 2,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
})