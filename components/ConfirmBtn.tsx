import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default (props:{onPress: Function}) => {
    return (
        <TouchableOpacity onPress={() => props.onPress()} style={{ marginBottom: 20, marginRight: 20, alignSelf: "flex-end" }}>
            <LinearGradient colors={['#88E7FF', '#5ABDFF']} style={{ flexDirection: "row", alignItems: "center" ,paddingHorizontal: 8, paddingVertical: 8, borderRadius: 100, }}>
                <Feather name="check-circle" size={35} color="white" />
                <Text style={{ fontSize: 25, color: "white", marginHorizontal: 10, fontWeight: "bold" }}>Confirm</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};
