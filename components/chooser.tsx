import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

interface items{
    items: {
        title: string;
        color: string;
    }[],
    onSelect: Function,
    style?: ViewStyle,
    value: string
}

export default ({ items, onSelect, style, value }:items)=>{
    const [colors, setColors] = useState(()=>{
        let list = []
        for (const item of items) {
            list.push(item.color)
        }
        return list
    })

    const [selection, Select] = useState(value ? value : undefined)

    useEffect(()=>{
        let list = []
        for (const item of items){
            list.push(item.color)
        }
        for (const [index, item] of items.entries()){
            if (item.title != selection ){
                list[index] = 'grey'
            }
        }
        setColors(list)
        onSelect(selection)
    }, [selection])
    
    return(
        <View style={[{ flexDirection: 'row'}, style]} >
            <TouchableOpacity
                style={[_Chooser.button, { backgroundColor: colors[0], borderTopRightRadius: 0, borderBottomRightRadius: 0, marginRight: 1 }]}
                onPress={()=> {
                    Select(items[0].title)
                }}
            >
                <Text style={_Chooser.text} >{ items[0].title }</Text>
            </TouchableOpacity>
            {
                items.slice(1,items.length-1).map((item, index)=> {
                    return(
                        <TouchableOpacity
                            style={[_Chooser.button, { backgroundColor: colors[index + 1], borderRadius: 0, marginRight: 1 }]}
                            key={item.title}
                            onPress={()=> {
                                Select(item.title)
                            }}
                        >
                            <Text style={_Chooser.text} >{ item.title }</Text>
                        </TouchableOpacity>
                    )
                })
            }
            <TouchableOpacity
                style={[_Chooser.button, { backgroundColor: colors[colors.length-1], borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}
                onPress={()=> {
                    Select(items[items.length-1].title)
                }}
            >
                <Text style={_Chooser.text} >{ items[items.length-1].title }</Text>
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
