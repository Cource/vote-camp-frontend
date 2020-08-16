import React, { useState } from "react"
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';
import { parties } from "../model/parties";
import OptionPicker from '../screens/landing/optionPicker'
import { Chooser, Tbox } from "./"

export default ()=> {
    const [ religion, setReligion ] = useState<'Select'|'Christian'|'Muslim'|'Hindu'|'Buddhist'>('Select')

    return(
        <View style={{ marginBottom: 10 }} >
            <Tbox placeholder="Mobile Number" />
            <Tbox placeholder="Email Id" />
            <View style={{ flexDirection: 'row' }} >
                <OptionPicker title="Religion" list={[ "Religion", "Christian", "Muslim", "Hindu", "Buddhist"]} state={religion} changeState={setReligion} titleStyle={{ fontSize: 0 }} width={180} />
                <OptionPicker title="Cast" list={[ "Cast", "Christian", "Muslim", "Hindu", "Buddhist"]} state={religion} changeState={setReligion} titleStyle={{ fontSize: 0 }} style={{ marginLeft: 10 }} width={100} />
            </View>
            <OptionPicker title="Education" list={["Education", "10th", "12th", "Degree", "PG"]} state={religion} changeState={setReligion} style={{ marginTop: 10 }} titleStyle={{ fontSize: 0 }} />
            <View style={{ flexDirection: 'row', marginTop: 10 }} >
                <Chooser items={parties} onSelect={()=> null} />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }} >
                <TouchableOpacity style={{ flexDirection: 'row', padding: 10, backgroundColor: '#757575', borderRadius: 7 }} >
                    <Text style={{ color: 'white', fontWeight: "bold", fontSize: 18 }} >Needs Support</Text>
                    <MaterialIcons name="accessible" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}