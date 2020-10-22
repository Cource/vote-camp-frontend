import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Chooser from "../../components/chooser";
import { Ionicons, Feather } from "@expo/vector-icons"
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../App';
import OptionPicker from '../../components/optionPicker';
import { MaterialIcons } from '@expo/vector-icons';
import { parties } from "../../model/parties";
import { addVoterAPI } from '../../api/v1'
import { useNavigation } from '@react-navigation/native';
import { lwrap } from '../../model/language';

type Props = StackScreenProps<StackParamList, 'voter'>
type Religion = 'Religion' | 'Christian' | 'Muslim' | 'Hindu' | 'Buddhist'
type Party = undefined | 'LDF' | 'UDF' | 'BJP' | 'NOTA'
type Education = 'Education' | '10th' | '12th' | 'Degree' | 'PG'

export default (props:Props)=> {
    const { type, name, guardian, sex, age, voterId, houseName, houseNumber, id } = props.route.params || {}
    const navigation = useNavigation()
    const emailExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    const [emailErr, setEmailErr] = useState(0)
    const [allErr, setAllErr] = useState(false)
    const [page, setPage] = useState(0)
    
    const [_name, set_Name] = useState(name)
    const [_guardian, set_Guardian] = useState(guardian)
    const [_age, set_Age] = useState(age)
    const [_sex, set_Sex] = useState(sex)
    const [_voterId, set_VoterId] = useState(voterId)
    const [_houseName, set_HouseName] = useState(houseName)
    const [_houseNumber, set_HouseNumber] = useState(houseNumber)
    const [_mobileNumber, set_MobileNumber] = useState('')
    const [_email, set_Email] = useState('')
    const [_religion, set_Religion] = useState<Religion>('Religion')
    const [_education, set_Education] = useState<Education>('Education')
    const [_party, set_Party] = useState<Party>(undefined)
    const [_support, set_Support] = useState(false)

    useEffect(() => {
        allErr && setTimeout(() => {
            setAllErr(false)
        }, 10000)
    }, [allErr])

    function submitDetails() {
        if (page === 0) {
            if (_name && _guardian && parseInt(_age || '0') >= 18 && _voterId && _houseName && _houseNumber && _sex) {
                setPage(1)
                setAllErr(false)
            } else {
                setAllErr(true)
            }
        } else {
            if (_party) {
                addVoterAPI({
                    id,
                    type,
                    name: _name,
                    guardian: _guardian,
                    age: _age,
                    sex: _sex,
                    houseName: _houseName,
                    houseNumber: _houseNumber,
                    voterId: _voterId,
                    email: _email,
                    mobileNumber: _mobileNumber,
                    religion: _religion,
                    party: _party,
                    status: _support.toString(),
                    education: _education,
                    gender: ''
                })
                setPage(0)
                setAllErr(false)
                type === 'detail' ?
                    navigation.goBack()
                    :
                    navigation.reset({
                        index: 1,
                        routes: [{ name: 'tabs' }]
                    })
            } else {
                setAllErr(true)
            }

        }
    }

    return (<ScrollView style={{ paddingHorizontal: 30, paddingTop: 50, flex: 1 }} >
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center", marginBottom: 20  }} onPress={()=>{
            setPage(0)
        }} >
            {
                page===1?
                    <Feather name="chevron-left" size={30} color="#555" style={{ marginRight: 5 }} />
                :null
            }
            <Text style={{ fontSize: 30, fontWeight: 'bold' }} >{type === 'detail' ? lwrap('Details') : lwrap('Add a voter')}</Text>
        </TouchableOpacity>
        {    
            page==0?
                <View>
                    <TextInput
                        placeholder={lwrap("Name")}
                        placeholderTextColor="#888"
                        value={_name}
                        onChangeText={(val:string) => set_Name(val)}
                        style={styles.TextBox}
                        maxLength={20}
                    />
                    <TextInput
                        placeholder={lwrap("Guardian")}
                        placeholderTextColor="#888"
                        value={_guardian}
                        onChangeText={(val:string) => set_Guardian(val)}
                        maxLength={20}
                        style={styles.TextBox}
                    />
                    <View style={{ flexDirection: 'row', alignItems: "center" }} >
                        <TextInput
                            placeholder={lwrap("Age")}
                            placeholderTextColor="#888"
                            value={_age}
                            onChangeText={(val: string) => set_Age(val)}
                            maxLength={2}
                            style={styles.TextBox}
                            keyboardType='number-pad'
                        />
                        <Chooser
                            items={[
                                    { color: '#66C2FF', title: 'M' },
                                    { color: '#FF6188', title: 'F' },
                                    { color: '#BA70FF', title: 'T' },
                            ]}
                            onSelect={(item:any)=> set_Sex(item)}
                            value={_sex as string}
                            style={{ marginBottom: 10, marginLeft: 10 }}
                        />
                    </View>
                    <TextInput
                        placeholder={lwrap("Voter ID")}
                        placeholderTextColor="#888"
                        value={_voterId}
                        onChangeText={(val:string) => set_VoterId(val)}
                        style={styles.TextBox}
                        maxLength={20}
                        autoCapitalize='characters'
                    />
                    <View style={{ flexDirection: 'row' }} >
                        <TextInput
                            placeholder={lwrap("House Name")}
                            placeholderTextColor="#888"
                            value={_houseName}
                            onChangeText={(val:string) => set_HouseName(val)}
                            style={styles.TextBox}
                            maxLength={20}
                        />
                        <TextInput
                            placeholder={lwrap("House Number")}
                            placeholderTextColor="#888"
                            value={_houseNumber}
                            onChangeText={(val:string) => set_HouseNumber(val)}
                            style={[styles.TextBox, { marginLeft: 10 }]}
                            keyboardType='numeric'
                            maxLength={4}
                        />
                    </View>
                </View>
            :
                <View style={{ marginBottom: 10 }} >
                    <View></View><View></View>
                    <TextInput
                        placeholder={lwrap("Mobile Number")}
                        placeholderTextColor="#888"
                        value={_mobileNumber}
                        onChangeText={(val:string) => set_MobileNumber(val)}
                        style={styles.TextBox}
                        keyboardType='phone-pad'
                        maxLength={10}
                    />
                    <TextInput
                        placeholder={lwrap("Email")}
                        placeholderTextColor="#888"
                        value={_email}
                        onChangeText={(val: string) => {
                            set_Email(val)
                            if (emailExp.test(val)) {
                                setEmailErr(0)
                            } else {
                                setEmailErr(2)
                            }
                        }}
                        style={[styles.TextBox, { borderWidth: emailErr }]}
                        maxLength={40}
                        autoCompleteType='email'
                        keyboardType='email-address'
                    />
                    <OptionPicker title="Religion" list={["Religion", "Christian", "Muslim", "Hindu", "Buddhist"]} state={_religion} changeState={set_Religion} titleStyle={{ fontSize: 0 }} />
                    <OptionPicker title="Education" list={["Education", "10th", "12th", "Degree", "PG"]} state={_education} changeState={set_Education} style={{ marginTop: 10 }} titleStyle={{ fontSize: 0 }} />
                    <Chooser items={parties} style={{ flexDirection: 'row', marginTop: 10 }} onSelect={(party: Party) => set_Party(party)} />
                    <View style={{ flexDirection: 'row', marginTop: 10 }} >
                        <TouchableOpacity
                            style={{ flexDirection: 'row', elevation: 2, padding: 10, backgroundColor: _support ? '#5ABDFF' : '#757575', borderRadius: 7, alignItems: "center" }}
                            onPress={()=>{
                                set_Support(!_support)
                            }}
                        >
                            <Text style={{ color: 'white', fontWeight: "bold", fontSize: 18, marginRight: 5 }} >{lwrap('Needs Support')}</Text>
                            <MaterialIcons name="accessible" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
        }
        {allErr &&
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }} >
                <Ionicons name="ios-warning" size={24} color="#f55" style={{ marginRight: 10 }} />
                <Text style={{ color: '#f55' }} >{lwrap('Complete the fields before you continue.')}</Text>
            </View>
        }
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 100,
                padding: 10,
                paddingHorizontal: 20,
                backgroundColor: page===0? '#B2BDBD' : '#5ABDFF',
                marginTop: allErr ? 35 - 25 : 35,
                elevation: 1,
            }}
            onPress={submitDetails}
        >
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }} >{page === 0 ? lwrap('Add More Details') : type === 'detail' ? lwrap('Submit Details') : lwrap('Create Voter')}</Text>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <Ionicons name="md-arrow-round-forward" size={30} color="white" />
            </View>
        </TouchableOpacity>
    </ScrollView>)
}

const styles = StyleSheet.create({
    TextBox: {
        backgroundColor: '#CCCCCC',
        borderColor: '#f66',
        borderRadius: 7,
        padding: 10,
        paddingVertical: 8,
        marginBottom: 10,
        flexGrow: 1
    }
})