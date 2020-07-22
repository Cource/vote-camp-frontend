import React, { useState } from 'react';
import { StyleSheet, Text, View, Picker, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Option, options } from "../../model/landing";

const OptionPicker = (props:Option)=>{
    const [currentItem, setCurrentItem] = useState(props.list[0])

    return (
        <View>
        <Text style={styles.optionTitle}>{props.title}</Text>
        <Picker 
            selectedValue={currentItem as string}
            onValueChange={(itemValue)=> setCurrentItem(itemValue as string)}
            style={{ height: 50, width: 300, backgroundColor: '#ddd' }}>
            {
                props.list.map((item)=>{
                    return(
                        <Picker.Item key={item as string} label={item as string} value={item as string}></Picker.Item>
                    )
                })
            }
        </Picker>
        </View>  
    )
}

export const Landing = ({ navigation })=>{
    return(<View style={styles.container}>
        <View>
            <Text style={styles.header}>Campaign Details</Text>
            <Text style={styles.party}>Kerala Congress</Text>
        </View>
        <View>
            {options.map((option)=>{
                return(
                    <OptionPicker key={option.title as string} title={option.title} list={option.list}/>
                )
            })}
        </View>
        <LinearGradient
            colors={['#5ABDFF', '#88E7FF']}
            style={styles.cta}>
            <TouchableOpacity onPress={()=> navigation.navigate('home')}>
            <Text style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: "700",
            }}>Start Campaign</Text>
            </TouchableOpacity>
        </LinearGradient>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      header: {
        fontSize: 35,
        fontWeight: "700",
        marginTop: 40
    },
    party: {
        alignSelf: 'flex-end',
        fontSize: 20,
        fontWeight: '700'
    },
    optionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
    },
    cta: {
        paddingHorizontal: 25,
        paddingVertical:15,
        marginBottom: 30,
        alignItems: 'center',
        borderRadius: 100
    },
})