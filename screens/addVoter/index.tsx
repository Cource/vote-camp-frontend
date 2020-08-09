import React, { useState } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import AddDetails from "../../components/addDetails";

const Tbox = ({ placeholder }: { placeholder: string })=>{
    const [value, setValue] = useState(placeholder)
    return(<>
        <TextInput value={value} onChangeText={(val)=> setValue(val)} style={{ backgroundColor: '#CCCCCC', borderRadius: 7, padding: 10, paddingVertical: 8, marginBottom: 10, flexGrow: 1 }} />
    </>)
}

const Chooser = ()=>{
    return(
        <View style={{ flexDirection: 'row', marginLeft: 20 }} >
            <TouchableOpacity style={[_Chooser.button, { backgroundColor: '#FF6188', borderTopRightRadius: 0, borderBottomRightRadius: 0 }]} >
                <Text style={_Chooser.text} >F</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[_Chooser.button, { backgroundColor: '#BA70FF', borderRadius: 0 }]} >
                <Text style={_Chooser.text} >T</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[_Chooser.button, { backgroundColor: '#57BCFF', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]} >
                <Text style={_Chooser.text} >M</Text>
            </TouchableOpacity>
        </View>
    )
}
const _Chooser = StyleSheet.create({
    button:{
        backgroundColor: 'grey',
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 7,
    },
    text: {
        color: 'white',
        fontWeight: 'bold'
    }
})

export default ()=> {

    const [ sex, setSex ] = useState(false)

    return(<View style={{ paddingHorizontal: 30, paddingTop: 50 }} >
        <Text style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 20 }} >Add a voter</Text>
        <Tbox placeholder="Name" />
        <Tbox placeholder="Guardian" />
        <View style={{ flexDirection: 'row', justifyContent: "center" }} >
            <Tbox placeholder="Age" />
            <Chooser/>
        </View>
        <Tbox placeholder="Voter Id" />
        <AddDetails/>
        <Tbox placeholder="Mobile Number" />
        <Tbox placeholder="Email Id" />
    </View>)
}