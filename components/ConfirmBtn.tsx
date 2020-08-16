import { Feather } from '@expo/vector-icons';
import { useNavigation, DefaultTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 20, marginRight: 20, alignSelf: "flex-end" }}>
            <LinearGradient colors={['#5ABDFF', '#88E7FF']} style={{ flexDirection: "row", alignItems: "center" ,paddingHorizontal: 8, paddingVertical: 8, borderRadius: 100, }}>
                <Feather name="check-circle" size={35} color="white" />
                <Text style={{ fontSize: 25, color: "white", marginHorizontal: 10, fontWeight: "bold" }}>Confirm</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};
