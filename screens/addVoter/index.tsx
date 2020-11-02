import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Chooser from "../../components/chooser";
import { Ionicons, Feather } from "@expo/vector-icons"
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../App';
import OptionPicker from '../../components/optionPicker';
import { parties } from "../../model/parties";
import { addVoterAPI } from '../../api/v1'
import { useNavigation } from '@react-navigation/native';
import { lwrap } from '../../model/language';
import CheckBox from '@react-native-community/checkbox';

type Props = StackScreenProps<StackParamList, 'voter'>

export default (props:Props)=> {
    const params = props.route.params || ''
    const { id, type } = props.route.params || { type: 'add' }
    const navigation = useNavigation()
    const emailExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    const [emailErr, setEmailErr] = useState(0)
    const [allErr, setAllErr] = useState(false)
    const [page, setPage] = useState(0)
    const [casts, setCasts] = useState(['Cast'])
    const [divisions, setDivisions] = useState(['Main'])
    
    const [name, setName] = useState(params.name)
    const [guardian, setGuardian] = useState(params.guardian)
    const [age, setAge] = useState(params.age)
    const [sex, setSex] = useState(params.sex)
    const [voterId, setVoterId] = useState(params.voterId)
    const [houseName, setHouseName] = useState(params.houseName)
    const [houseNumber, setHouseNumber] = useState(params.houseNumber)
    const [mobileNumber, setMobileNumber] = useState(params.mobileNumber)
    const [whatsappNumber, setWhatsappNumber] = useState(params.whatsappNumber)
    const [religion, setReligion] = useState(params.religion)
    const [cast, setCast] = useState(params.cast)
    const [education, setEducation] = useState(params.education)
    const [party, setParty] = useState(params.party)
    const [division, setDivision] = useState(params.division)
    const [habits, setHabits] = useState(params.habits)
    const [cash, setCash] = useState(params.cash)
    const [keyVoter, setkeyVoter] = useState(params.keyVoter)
    const [voteStatus, setVoteStatus] = useState(params.voteStatus)
    const [postalType, setPostalType] = useState(params.postalType)
    const [remarks, setRemarks] = useState(params.remarks)

    useEffect(() => {
        allErr && setTimeout(() => {
            setAllErr(false)
        }, 5000)
    }, [allErr])

    useEffect(() => {
        setWhatsappNumber(mobileNumber)
    }, [mobileNumber])

    useEffect(() => {
        if (religion === 'Hindu') {
            setCasts(["Nair", "Ezhava", "Vishwakarma", "Bhramin", "Vilakithala Nair"])
        } else if (religion === 'Atheist') {
            setCasts(['Atheist'])
        }
    }, [religion])

    useEffect(() => {
        if (party === 'LDF') {
            setDivisions(['CPI(M)'])
        } else if (party === 'NOTA') {
            setDivisions(['NOTA'])
        }
    }, [party])

    function submitDetails_dev() {
        if (page === 0) {
            setPage(1)
        } else if (page === 1) {
            setPage(2)
        }
    }

    function submitDetails() {
        if (page === 0) {
            if (name && guardian && parseInt(age || '0') >= 18 && voterId && houseName && houseNumber && sex) {
                setPage(1)
                setAllErr(false)
            } else setAllErr(true)
        } else if (page === 1) {
            if (party) {
                setPage(2)
                setAllErr(false)
            } else setAllErr(true)
        } else {
            addVoterAPI({
                id, name, guardian, age, sex, houseName, houseNumber,
                voterId, whatsappNumber, mobileNumber, religion, cast, education,
                party, division, habits, cash, keyVoter, voteStatus, postalType, remarks
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
        }
    }

    return (<ScrollView style={{ paddingHorizontal: 30, paddingTop: 50, flex: 1 }} >
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center", marginBottom: 20  }} onPress={()=>{
            page > 0 && setPage(page - 1)
        }} >
            {
                page > 0 ?
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
                        value={name}
                        onChangeText={(val: string) => setName(val)}
                        style={styles.TextBox}
                        maxLength={20}
                    />
                    <TextInput
                        placeholder={lwrap("Guardian")}
                        placeholderTextColor="#888"
                        value={guardian}
                        onChangeText={(val: string) => setGuardian(val)}
                        maxLength={20}
                        style={styles.TextBox}
                    />
                    <View style={{ flexDirection: 'row', alignItems: "center" }} >
                        <TextInput
                            placeholder={lwrap("Age")}
                            placeholderTextColor="#888"
                            value={age}
                            onChangeText={(val: string) => setAge(val)}
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
                            onSelect={(item: any) => setSex(item)}
                            value={sex as string}
                            style={{ marginVertical: 10, marginLeft: 10 }}
                        />
                    </View>
                    <TextInput
                        placeholder={lwrap("Voter ID")}
                        placeholderTextColor="#888"
                        value={voterId}
                        onChangeText={(val: string) => setVoterId(val)}
                        style={styles.TextBox}
                        maxLength={20}
                        autoCapitalize='characters'
                    />
                    <View style={{ flexDirection: 'row' }} >
                        <TextInput
                            placeholder={lwrap("House Name")}
                            placeholderTextColor="#888"
                            value={houseName}
                            onChangeText={(val: string) => setHouseName(val)}
                            style={styles.TextBox}
                            maxLength={20}
                        />
                        <TextInput
                            placeholder={lwrap("House Number")}
                            placeholderTextColor="#888"
                            value={houseNumber}
                            onChangeText={(val: string) => setHouseNumber(val)}
                            style={[styles.TextBox, { marginLeft: 10 }]}
                            keyboardType='numeric'
                            maxLength={4}
                        />
                    </View>
                </View>
            :
                page === 1 ?
                    <View>
                        <View></View><View></View>
                        <TextInput
                            placeholder={lwrap("Mobile Number")}
                            placeholderTextColor="#888"
                            value={mobileNumber}
                            onChangeText={(val: string) => setMobileNumber(val)}
                            style={styles.TextBox}
                            keyboardType='phone-pad'
                            maxLength={10}
                        />
                        <TextInput
                            placeholder={lwrap("Whatsapp Number")}
                            placeholderTextColor="#888"
                            value={whatsappNumber}
                            onChangeText={(val: string) => {
                                setWhatsappNumber(val)
                                // if (emailExp.test(val)) {
                                //     setEmailErr(0)
                                // } else {
                                //     setEmailErr(2)
                                // }
                            }}
                            style={[styles.TextBox, { borderWidth: emailErr }]}
                            maxLength={10}
                            // autoCompleteType='email'
                            keyboardType='phone-pad'
                        />
                        <View style={{ flexDirection: 'row' }} >
                            <OptionPicker title="Religion" list={["Atheist", "Christian", "Muslim", "Hindu", "Buddhist"]} state={religion} changeState={setReligion} width={150} />
                            <OptionPicker title="Cast" list={casts} state={cast} changeState={setCast} style={{ marginLeft: 10 }} width={130} />
                        </View>
                        <OptionPicker title="Education" list={["None", "10th", "12th", "Degree", "PG"]} state={education} changeState={setEducation} />
                        <View style={{ flexDirection: 'row' }} >
                            <OptionPicker title="Party" list={['NOTA', 'UDF', 'BJP', 'LDF']} state={party} changeState={setParty} style={{ marginRight: 10 }} width={150} />
                            <OptionPicker title="Division" list={divisions} state={division} changeState={setDivision} width={130} />
                        </View>
                    </View>
                    :
                    <View>
                        <OptionPicker title="Habits" list={['None', 'Drinking', 'Smoking']} state={habits} changeState={setHabits} />
                        <OptionPicker title="Financial status" list={['Middle-Class', 'Poor', 'Rich']} state={cash} changeState={setCash} />
                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', padding: 7, borderWidth: 2, borderColor: '#707070', borderRadius: 7, marginVertical: 5, marginTop: 10 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Key Voter</Text>
                            <CheckBox
                                onValueChange={() => setkeyVoter(!keyVoter)}
                                value={keyVoter}
                                tintColors={{ true: '#5ABDFF' }}
                            />
                        </View>
                        <Chooser
                            items={[
                                { color: '#66C2FF', title: 'Normal Vote' },
                                { color: '#BA70FF', title: 'Postal Vote' },
                                { color: '#FF6188', title: 'Not Voting' },
                            ]}
                            onSelect={(item: any) => {
                                setVoteStatus(item)
                                setPostalType('Not Postal')
                            }}
                            value={voteStatus}
                            style={{ marginVertical: 10, alignSelf: "center" }}
                        />
                        {
                            voteStatus === 'Postal Vote' && <Chooser
                                items={[
                                    { color: '#BA70FF', title: 'NRI' },
                                    { color: '#BA70FF', title: 'Bed Ridden' },
                                    { color: '#BA70FF', title: 'Election Worker' },
                                ]}
                                onSelect={(item: any) => setPostalType(item)}
                                value={postalType}
                                style={{ marginBottom: 10, alignSelf: "center" }}
                            />

                        }
                        <TextInput
                            placeholder={lwrap("Additional Remarks")}
                            placeholderTextColor="#888"
                            value={remarks}
                            onChangeText={(val: string) => setRemarks(val)}
                            style={styles.TextBox}
                            maxLength={250}
                            multiline
                            numberOfLines={4}
                        />
                    </View>
        }
        {allErr &&
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }} >
                <Ionicons name="ios-warning" size={24} color="#f55" style={{ marginRight: 10 }} />
            {age && parseInt(age) < 18 ?
                <Text style={{ color: '#f55' }} >{lwrap('A voter has to at least 18 years old.')}</Text>
                :
                    <Text style={{ color: '#f55' }} >{lwrap('Complete the fields before you continue.')}</Text>
            }
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
                backgroundColor: page < 2 ? '#B2BDBD' : '#5ABDFF',
                marginTop: allErr ? 35 - 25 : 35,
                elevation: 1,
            }}
            onPress={submitDetails_dev}
        >
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }} >{page < 2 ? lwrap('Add More Details') : type === 'detail' ? lwrap('Submit Details') : lwrap('Create Voter')}</Text>
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
        marginVertical: 5,
        flexGrow: 1
    }
})