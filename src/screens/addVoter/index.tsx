import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import Chooser from "../../components/chooser";
import { Ionicons, Feather } from "@expo/vector-icons"
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../../App';
import OptionPicker from '../../components/optionPicker';
import { addVoterAPI } from '../../api/v1'
import { useNavigation } from '@react-navigation/native';
import { localize } from '../../Design/language';
import CheckBox from '@react-native-community/checkbox';

type Props = StackScreenProps<StackParamList, 'voter'>

export default (props: Props) => {
    const params = props.route.params || ''
    const { id, type } = props.route.params || { type: 'add' }
    const navigation = useNavigation()

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
    const [whatsAppNumber, setWhatsappNumber] = useState(params.whatsAppNumber)
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
        switch (religion) {
            case 'Hindu':
                setCasts(["Nair", "Ezhava", "Vishwakarma", "Bhramin", "Vilakithala Nair", "Others"])
                break
            case 'Christian':
                setCasts(["Orthodox (includes Jacobite)", "Catholic", "Knanaya (Catholic)", "Others"])
                break
            case 'Muslim':
                setCasts(["General"])
                break
            case 'Buddhist':
                setCasts(["General"])
                break
            default:
                setCasts(['Atheist'])
        }
    }, [religion])

    useEffect(() => {
        switch (party) {
            case 'LDF':
                setDivisions(['CPI(M)', 'CPI', 'Others'])
                break
            case 'UDF':
                setDivisions(['Kerala Congress (M)', 'INC', 'Others'])
                break
            case 'BJP':
                setDivisions(['Others'])
                break
            case 'Others':
                setDivisions(['Others'])
                break
            default:
                setDivisions(['NOTA'])
        }
    }, [party])

    function changePage(err: boolean) {
        setAllErr(err)
        if (!err) setPage(page + 1)
    }

    function submitDetails() {
        switch (page) {
            case 0:
                changePage(!(name && guardian && parseInt(age || '0') >= 18 && voterId && houseName && houseNumber && sex))
                break
            case 1:
                changePage(!(mobileNumber && whatsAppNumber))
                break
            default:
                setAllErr(!voteStatus)
                if (voteStatus) {
                    addVoterAPI({
                        type, id, name, guardian, age, sex, houseName, houseNumber,
                        voterId, whatsAppNumber, mobileNumber, religion, cast, education,
                        party, division, habits, cash, keyVoter, voteStatus, postalType, remarks, visitCount: (params.visitCount || 0) + 1
                    }).then(() => {
                        Alert.alert('Success', 'Successfully added/edited Voter')
                    }).finally(() => {
                        setPage(0)
                        type === 'detail' ?
                            navigation.goBack()
                            :
                            navigation.reset({
                                index: 1,
                                routes: [{ name: 'tabs' }]
                            })
                    }).catch((err) => {
                        Alert.alert('Failed', 'The voter was not added' + err)
                    })
                }
        }
    }

    return (<ScrollView style={{ paddingHorizontal: 30, paddingVertical: 50, flex: 1 }} >
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: "center", marginBottom: 20 }} onPress={() => {
            page > 0 && setPage(page - 1)
        }} >
            {
                page > 0 ?
                    <Feather name="chevron-left" size={30} color="#555" style={{ marginRight: 5 }} />
                    : null
            }
            <Text style={{ fontSize: 30, fontWeight: 'bold' }} >{type === 'detail' ? localize('Details') : localize('Add a voter')}</Text>
        </TouchableOpacity>
        {
            page == 0 ?
                <View>
                    <View /><View />
                    <TextInput
                        placeholder={localize("Name")}
                        placeholderTextColor="#888"
                        value={name}
                        onChangeText={(val: string) => setName(val)}
                        style={styles.TextBox}
                        maxLength={20}
                    />
                    <TextInput
                        placeholder={localize("Guardian")}
                        placeholderTextColor="#888"
                        value={guardian}
                        onChangeText={(val: string) => setGuardian(val)}
                        maxLength={20}
                        style={styles.TextBox}
                    />
                    <View style={{ flexDirection: 'row', alignItems: "center" }} >
                        <TextInput
                            placeholder={localize("Age")}
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
                        placeholder={localize("Voter ID")}
                        placeholderTextColor="#888"
                        value={voterId}
                        onChangeText={(val: string) => setVoterId(val)}
                        style={styles.TextBox}
                        maxLength={20}
                        keyboardType='default'
                        autoCapitalize='characters'
                    />
                    <View style={{ flexDirection: 'row' }} >
                        <TextInput
                            placeholder={localize("House Name")}
                            placeholderTextColor="#888"
                            value={houseName}
                            onChangeText={(val: string) => setHouseName(val)}
                            style={styles.TextBox}
                            maxLength={20}
                        />
                        <TextInput
                            placeholder={localize("House Number")}
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
                        <TextInput
                            placeholder={localize("Mobile Number")}
                            placeholderTextColor="#888"
                            value={mobileNumber}
                            onChangeText={(val: string) => setMobileNumber(val)}
                            style={styles.TextBox}
                            keyboardType='phone-pad'
                            maxLength={10}
                        />
                        <TextInput
                            placeholder={localize("Whatsapp Number")}
                            placeholderTextColor="#888"
                            value={whatsAppNumber}
                            onChangeText={(val: string) => {
                                setWhatsappNumber(val)
                            }}
                            style={[styles.TextBox]}
                            maxLength={10}
                            keyboardType='phone-pad'
                        />
                        <View style={{ flexDirection: 'row' }} >
                            <OptionPicker title={localize("Religion")} list={["Atheist", "Christian", "Muslim", "Hindu", "Buddhist", "Others"]} state={religion} changeState={setReligion} widthDividend={2} widthOffset={5} />
                            <OptionPicker title={localize("Cast")} list={casts} state={cast} changeState={setCast} style={{ marginLeft: 10 }} widthDividend={2} widthOffset={5} />
                        </View>
                        <OptionPicker title={localize("Education")} list={["None", "10th", "12th", "Degree", "PG"]} state={education} changeState={setEducation} />
                        <View style={{ flexDirection: 'row' }} >
                            <OptionPicker title={localize("Party")} list={['NOTA', 'UDF', 'BJP', 'LDF', 'Others']} state={party} changeState={setParty} style={{ marginRight: 10 }} widthDividend={2} widthOffset={5} />
                            <OptionPicker title={localize("Division")} list={divisions} state={division} changeState={setDivision} widthDividend={2} widthOffset={5} />
                        </View>
                    </View>
                    :
                    <View>
                        <OptionPicker title={localize("Habits")} list={['None', 'Drinking', 'Smoking']} state={habits} changeState={setHabits} />
                        <OptionPicker title={localize("Financial status")} list={['Middle-Class', 'Poor', 'Rich']} state={cash} changeState={setCash} />
                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', padding: 7, borderWidth: 2, borderColor: '#707070', borderRadius: 7, marginVertical: 5, marginTop: 10 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{localize('Key Voter')}</Text>
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
                            placeholder={localize("Additional Remarks")}
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
                    <Text style={{ color: '#f55' }} >{localize('A voter has to at least 18 years old.')}</Text>
                    :
                    <Text style={{ color: '#f55' }} >{localize('Complete the fields before you continue.')}</Text>
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
                marginBottom: 100
            }}
            onPress={submitDetails}
        >
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }} >{page < 2 ? localize('Add More Details') : type === 'detail' ? localize('Submit Details') : localize('Create Voter')}</Text>
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