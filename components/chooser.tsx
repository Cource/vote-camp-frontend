import React, {useState} from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

interface items{
    items: {
        title: string;
        color: string;
    }[],
    onSelect: Function,
    style?: ViewStyle
}

export default ({ items, onSelect, style }:items)=>{
    const [colors, setColors] = useState(()=>{
        let list = []
        for (const item of items) {
            list.push(item.color)
        }
        return list
    })
    
    const selectEffect = (title:string)=>{
        for (const i of colors){
            if (i === 'grey') {
                let list = []
                for (const item of items) {
                    list.push(item.color)
                }
                setColors(list)
                return
            }
        }
        let list = colors
        for (const [index, item] of items.entries()){
            if (item.title != title ){
                list[index] = 'grey'
            }
        }
        setColors(list)
    }
    
    return(
        <View style={[{ flexDirection: 'row'}, style]} >
            <TouchableOpacity
                style={[_Chooser.button, { backgroundColor: colors[0], borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
                onPress={()=> {
                    selectEffect(items[0].title)
                    onSelect(items[0].title)
                }}
            >
                <Text style={_Chooser.text} >{ items[0].title }</Text>
            </TouchableOpacity>
            {
                items.slice(1,items.length-1).map((item, index)=> {
                    return(
                        <TouchableOpacity
                            style={[_Chooser.button, { backgroundColor: colors[index+1], borderRadius: 0 }]}
                            key={item.title}
                            onPress={()=> {
                                selectEffect(item.title)
                                onSelect(item.title)
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
                    selectEffect(items[items.length-1].title)
                    onSelect(items[items.length-1].title)
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
