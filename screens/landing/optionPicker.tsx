import React from 'react';
import { View, Picker, Text, StyleSheet } from 'react-native';
import { Option } from '../../model/landing'

export default (props:Option)=>{
    return (
        <View>
            <Text style={styles.optionTitle}>{props.title}</Text>
            <View style={{ borderRadius: 10, borderColor: "#555", borderStyle: "solid", borderWidth: 2 }}>
                <Picker 
                    selectedValue={props.state as string}
                    onValueChange={(itemValue)=> {
                        props.changeState
                        ?
                        props.changeState(itemValue)
                        : null
                    }}
                    style={{ height: 50, width: 300 }}
                    >
                    {
                        props.list.map((item)=>{
                            return(
                                <Picker.Item key={item as string} label={item as string} value={item as string}></Picker.Item>
                            )
                        })
                    }
                </Picker>
            </View>
        </View>  
    )
}

const styles = StyleSheet.create({
    optionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
    },
})