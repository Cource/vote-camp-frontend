import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

export default ()=>{

    const [ email, onEmailChange ] = useState('')
    const [ phone, onPhoneChange ] = useState('')
    
    return(
        <View style={{ justifyContent: 'space-between', flex: 1 }}>
            <View style={styles.top}>
                <Text style={[styles.header, { marginBottom: 40 }]}>Sign in</Text>
                <Text style={[styles.header, {fontSize: 20}]} >Email</Text>
                <TextInput value={email} onChangeText={onEmailChange} style={styles.input} />
                <Text style={[styles.header, {fontSize: 20}]} >Phone Number</Text>
                <TextInput value={phone} onChangeText={onPhoneChange} style={styles.input} />
            </View>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity>
                    <LinearGradient colors={['#5ABDFF', '#88E7FF']} style={ styles.cta } >
                        <Text style={{
                            color: 'white',
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}>Sign in</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    top: {
        marginVertical: 40,
        marginHorizontal: 25,
    },
    header: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#ddd',
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    cta: {
        paddingHorizontal: 25,
        paddingVertical:15,
        marginBottom: 30,
        alignItems: 'center',
        borderRadius: 100
    }
})