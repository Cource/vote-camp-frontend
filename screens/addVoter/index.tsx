import React, { useState } from 'react';
import { View, Text, ViewStyle } from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import AddDetails from "../../components/addDetails";
import Chooser from "../../components/chooser"

const Tbox = ({ placeholder, style }: { placeholder: string, style?: ViewStyle })=>{
    const [value, setValue] = useState(placeholder)
    return(<>
        <TextInput value={value} onChangeText={(val)=> setValue(val)} style={[{ backgroundColor: '#CCCCCC', borderRadius: 7, padding: 10, paddingVertical: 8, marginBottom: 10, flexGrow: 1 }, style]} />
    </>)
}

export default ()=> {

    const [ sex, setSex ] = useState('')

    return(<View style={{ paddingHorizontal: 30, paddingTop: 50 }} >
        <Text style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 20 }} >Add a voter</Text>
        <Tbox placeholder="Name" />
        <Tbox placeholder="Guardian" />
        <View style={{ flexDirection: 'row', justifyContent: "center" }} >
            <Tbox placeholder="Age" />
            <Chooser
                items={[
                    {color: '#FF6188', title: 'F'},
                    {color: '#BA70FF', title: 'T'},
                    {color: '#66C2FF', title: 'M'}
                ]}
                onSelect={(item:string)=> setSex(item)}
                style={{ marginBottom: 9, marginLeft: 10 }}
            />
        </View>
        <Tbox placeholder="Voter Id" />
        <View style={{ flexDirection: 'row' }} >
            <Tbox placeholder="House Name" />
            <Tbox placeholder="House No" style={{ marginLeft: 10 }} />
        </View>
        <AddDetails/>
    </View>)
}