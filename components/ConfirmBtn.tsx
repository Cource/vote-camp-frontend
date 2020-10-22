import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { lwrap } from '../model/language';

export default (props: { onPress: Function, icon?: boolean, text?: string, position?: "center" | "right" }) => {
    return (
        <TouchableOpacity onPress={() => props.onPress()} style={props.position === "center" ? { marginBottom: 30, alignSelf: "center" } : { marginBottom: 20, marginRight: 20, alignSelf: "flex-end" }}>
            <LinearGradient colors={['#88E7FF', '#5ABDFF']} style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: !props.icon ? 20 : 8, paddingVertical: !props.icon ? 15 : 8, borderRadius: 100, }}>
                {props.icon ?
                <Feather name="check-circle" size={35} color="white" />
                    : null
                }
                <Text style={{ fontSize: 25, color: "white", marginHorizontal: 10, fontWeight: "bold" }}>{props.text ? props.text : lwrap("Confirm")}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};
