import { Picker } from '@react-native-community/picker';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default (props: any) => {
    return (
        <View style={[props.style, styles.option]} >
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
    option: {
        marginVertical: 5
    },
    optionTitle: {
        fontWeight: "bold",
        zIndex: 10,
        alignSelf: "flex-start",
        fontSize: 15,
        marginLeft: 5,
        marginBottom: -10,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 5
    },
})