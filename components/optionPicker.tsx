import { Picker } from '@react-native-community/picker';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

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
                    style={{ height: 40, width: (Dimensions.get('window').width - 30 * 2) / (props.widthDividend || 1) - (props.widthOffset || 0) - 2 * 2 }}
                >
                    {
                        props.list.map((item: string) => {
                            return (
                                <Picker.Item key={item} label={item} value={item}></Picker.Item>
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