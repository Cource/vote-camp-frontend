import React from 'react';
import { Picker, StyleSheet, Text, View } from 'react-native';
import { Option } from '../model/landing';

export default (props: Option) => {
    return (
        <View style={props.style} >
            <Text style={[styles.optionTitle, props.titleStyle]}>{props.title}</Text>
            <View style={{ borderRadius: 7, borderColor: "#555", borderStyle: "solid", borderWidth: 2 }}>
                <Picker
                    selectedValue={props.state}
                    onValueChange={(itemValue) => {
                        props.changeState
                            ?
                            props.changeState(itemValue)
                            : null
                    }}
                    style={{ height: 40, width: props.width ? props.width : 300 }}
                >
                    {
                        props.list.map((item) => {
                            return (
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
    },
})