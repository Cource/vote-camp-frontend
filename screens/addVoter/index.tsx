import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TextInput, StyleSheet, ActivityIndicator } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Chooser } from "../../components";
import { Ionicons } from "@expo/vector-icons"
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../App';
import DateTimePicker from '@react-native-community/datetimepicker';
import OptionPicker from '../landing/optionPicker';
import { MaterialIcons } from '@expo/vector-icons';
import { parties } from "../../model/parties";
import { addVoterAPI } from '../../api/v1'
import { useNavigation } from '@react-navigation/native';
import { NavigationAction } from '@react-navigation/native'

type Props = StackScreenProps<StackParamList, 'voter'>
type Religion = 'Select'|'Christian'|'Muslim'|'Hindu'|'Buddhist'
type Party = 'LDF'|'UDF'|'BJP'|'NOTA'

export default (props:Props)=> {
    const { type, name, guardian, sex, dob, voterId, houseName, houseNumber, id } = props.route.params || { type: 'add', name: 'Name', guardian: 'Guardian', sex: undefined, dob: undefined, voterId: 'VoterId', houseName: 'House Name', houseNumber: "House Number" }
    const navigation = useNavigation()

    const [showDatePicker, setDatePicker] = useState(false)
    const [page, setPage] = useState(0)
    const [submit, setSubmit] = useState(false)
    const initial = useRef(true)
    
    const [_name, set_Name] = useState(name)
    const [_guardian, set_Guardian] = useState(guardian)
    const [_dob, set_Dob] = useState(new Date(dob||0))
    const [_sex, set_Sex] = useState(sex)
    const [_voterId, set_VoterId] = useState(voterId)
    const [_houseName, set_HouseName] = useState(houseName)
    const [_houseNumber, set_HouseNumber] = useState(houseNumber)
    const [_mobileNumber, set_MobileNumber] = useState('Mobile Number')
    const [_email, set_Email] = useState('Email')
    const [_religion, set_Religion] = useState<Religion>('Select')
    const [_education, set_Education] = useState<'Select'|'Christian'|'Muslim'|'Hindu'|'Buddhist'>('Select')
    const [_cast, set_Cast] = useState<'Select'|'Christian'|'Muslim'|'Hindu'|'Buddhist'>('Select')
    const [_party, set_Party] = useState<Party>('LDF')
    const [_support, set_Support] = useState(false)

    useEffect(()=>{
        if (initial.current){
            initial.current = false
        }else{
            addVoterAPI({
                id,
                type,
                name: _name,
                guardian: _guardian,
                dob: _dob.toDateString(),
                sex: _sex,
                houseName: _houseName,
                houseNumber: _houseNumber,
                voterId: _voterId,
                email: _email,
                mobileNumber: _mobileNumber,
                religion: _religion,
                cast: _cast,
                party: _party,
                status: _support.toString(),
                education: _education,
            })
        }
    }, [submit])
    
    return(<View style={{ paddingHorizontal: 30, paddingTop: 50, flex: 1 }} >
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center", marginBottom: 20  }} onPress={()=>{
            setPage(0)
        }} >
            {
                page===1?
                <Ionicons name="ios-arrow-back" size={30} color="#555" />
                :null
            }
            <Text style={{ fontSize: 36, fontWeight: 'bold', marginLeft: 10}} >{type==='detail' ? 'Details' :'Add a voter'}</Text>
        </TouchableOpacity>
        {    
            page==0?
            <View>
                <TextInput
                    value={_name}
                    onChangeText={(val:string) => set_Name(val)}
                    style={styles.TextBox}
                />
                <TextInput
                    value={_guardian}
                    onChangeText={(val:string) => set_Guardian(val)}
                    style={styles.TextBox}
                />
                <View style={{ flexDirection: 'row', justifyContent: "center" }} >
                    <TouchableOpacity
                        onPress={()=> setDatePicker(true)}
                    >
                        <Text style={{ backgroundColor: '#CCCCCC', paddingHorizontal: 20, padding: 10, borderRadius: 7 }} >{_dob.toDateString() === 'Thu Jan 01 1970' ? "Date Of Birth" : _dob.toDateString()}</Text>
                    </TouchableOpacity>
                    {
                        showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={_dob}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={(event, date)=> {
                                setDatePicker(false)
                                set_Dob(date || _dob)
                            }}
                        />
                    )}
                    <View style={{ flexDirection: 'row', marginBottom: 10, marginLeft: 10 }}>
                        <Chooser
                            items={[
                                {color: '#FF6188', title: 'F'},
                                {color: '#BA70FF', title: 'T'},
                                {color: '#66C2FF', title: 'M'}
                            ]}
                            onSelect={(item:any)=> set_Sex(item)}
                            value={_sex as string}
                        />
                    </View>
                </View>
                <TextInput
                    value={_voterId}
                    onChangeText={(val:string) => set_VoterId(val)}
                    style={styles.TextBox}
                />
                <View style={{ flexDirection: 'row' }} >
                    <TextInput
                        value={_houseName}
                        onChangeText={(val:string) => set_HouseName(val)}
                        style={styles.TextBox}
                    />
                    <TextInput
                        value={_houseNumber}
                        onChangeText={(val:string) => set_HouseNumber(val)}
                        style={[styles.TextBox, { marginLeft: 10 }]}
                    />
                </View>
            </View>
            :
            <View style={{ marginBottom: 10 }} >
                <TextInput
                    value={_mobileNumber}
                    onChangeText={(val:string) => set_MobileNumber(val)}
                    style={styles.TextBox}
                />
                <TextInput
                        value={_email}
                        onChangeText={(val:string) => set_Email(val)}
                        style={styles.TextBox}
                    />
                <View style={{ flexDirection: 'row' }} >
                    <OptionPicker title="Religion" list={[ "Religion", "Christian", "Muslim", "Hindu", "Buddhist"]} state={_religion} changeState={set_Religion} titleStyle={{ fontSize: 0 }} width={180} />
                    <OptionPicker title="Cast" list={[ "Cast", "Christian", "Muslim", "Hindu", "Buddhist"]} state={_cast} changeState={set_Cast} titleStyle={{ fontSize: 0 }} style={{ marginLeft: 10 }} width={100} />
                </View>
                <OptionPicker title="Education" list={["Education", "10th", "12th", "Degree", "PG"]} state={_education} changeState={set_Education} style={{ marginTop: 10 }} titleStyle={{ fontSize: 0 }} />
                <View style={{ flexDirection: 'row', marginTop: 10 }} >
                    <Chooser value="NOTA" items={parties} onSelect={(party:Party)=> set_Party(party)} />
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }} >
                    <TouchableOpacity
                        style={{ flexDirection: 'row', padding: 10, backgroundColor: _support ? '#5ABDFF' : '#757575', borderRadius: 7 }}
                        onPress={()=>{
                            set_Support(!_support)
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: "bold", fontSize: 18 }} >Needs Support</Text>
                        <MaterialIcons name="accessible" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        }
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 30,
                padding: 10,
                paddingHorizontal: 20,
                backgroundColor: page===0? '#B2BDBD' : '#5ABDFF',
                marginTop: 50,
            }}
            onPress={()=> {
                if (page===0){
                    setPage(1)
                } else {
                    setSubmit(!submit)
                    setPage(0)
                    type==='detail'?
                        navigation.navigate('detail')
                    :
                        navigation.navigate('home')
                    
                }
            }}
        >
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }} >{page===0? 'Add More Details' : 'Create Voter'}</Text>
            <Ionicons name="md-arrow-round-forward" size={30} color="white" />
        </TouchableOpacity>
    </View>)
}

const styles = StyleSheet.create({
    TextBox: {
        backgroundColor: '#CCCCCC',
        borderRadius: 7,
        padding: 10,
        paddingVertical: 8,
        marginBottom: 10,
        flexGrow: 1
    }
})