import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';
import { parties, party } from "../model/parties";
import OptionPicker from '../screens/landing/optionPicker'

export default ()=> {
    const [ religion, setReligion ] = useState<'Select'|'Christian'|'Muslim'|'Hindu'|'Buddhist'>('Select')

    return(
        <View style={{ marginBottom: 10 }} >
            <View style={{ flexDirection: 'row', marginBottom: 10 }} >
                <TouchableOpacity style={{ flexDirection: 'row', padding: 10, backgroundColor: '#757575', borderRadius: 7 }} >
                    <Text style={{ color: 'white', fontWeight: "bold", fontSize: 18 }} >Needs Support</Text>
                    <MaterialIcons name="accessible" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }} >
                {
                    parties.map((party:party)=>{
                        return(
                            <TouchableOpacity
                                onPress={ ()=> {}}
                                key={ party.key }
                                style={[ styles.button, { backgroundColor: party.color } ]}>
                                <Text style={styles.buttonText}>{party.key}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <OptionPicker title="Religion" list={["Christian", "Muslim", "Hindu", "Buddhist"]} state={religion} changeState={setReligion} />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        backgroundColor: "#555",
        padding: 10,
        paddingHorizontal: 18,
        borderRadius: 100,
        marginRight: 10,
        marginVertical: 5,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
})