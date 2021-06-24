import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';
import { ActivityIndicator, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { getWardsAPI, reqOtpAPI, verifyOtpAPI } from '../../api/v1';
import ConfirmBtn from '../../components/ConfirmBtn';
import { Feather } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../../App';
import { localize } from '../../Design/language';
import styled from 'styled-components'

type props = StackScreenProps<StackParamList, 'signIn'>


function verifyNumber(phone: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setPage: React.Dispatch<React.SetStateAction<number>>, setBorder: React.Dispatch<React.SetStateAction<number>>) {
    if (/[0-9]{10}/.test(phone)) {
        setLoading(true);
        reqOtpAPI(phone)
            .then((res) => {
                if (!res.data.message) {
                    setBorder(0);
                    setPage(1);
                }
            })
            .catch((err) => err.response.status === 400 ? setBorder(2) : null)
            .finally(() => setLoading(false));
    } else {
        setBorder(2);
    }
}

function sendOtp(otp: string, phone: string,
    navigation: props["navigation"],
    setBorder: React.Dispatch<React.SetStateAction<number>>) {
    if (/[0-9]{6}/.test(otp)) {
        verifyOtpAPI(phone, otp)
            .then(async (res) => {
                AsyncStorage.multiSet([
                    ['auth', res.data.token],
                    ['uid', res.data.id.toString()],
                    ['wardId', res.data.wardId.toString()],
                    ['cityId', res.data.cityId.toString()],
                    ['districtId', res.data.districtId.toString()],
                    ['ward', res.data.wardName]
                ]);
                // const wards = await getWardsAPI(res.data.districtId, res.data.cityId);
                // for (let ward of wards.data) {
                //     if (ward.id === res.data.wardId) {
                //         await AsyncStorage.setItem('ward', ward.name);
                //     }
                // }
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'tabs' }]
                });
            })
            .catch((err) => err.response.status === 400 ? setBorder(2) : null);
    } else {
        setBorder(2);
    }
}

export default ({ navigation }: props) => {
    const [phone, onPhoneChange] = useState('')
    const [otp, onOtpChange] = useState('')
    const [page, setPage] = useState(0)
    const [border, setBorder] = useState(0)
    const [loading, setLoading] = useState(false)

    return (
        <Container>
            <Body>
                <Header onPress={() => setPage(0)}>
                    {
                        page !== 0 ?
                            <Feather name="chevron-left" size={30} color="#555" />
                            : null
                    }
                    <HeaderText>{localize('Login')}</HeaderText>
                </Header>
                {
                    page === 0 ?
                        <>
                            <Placeholder>{localize('Phone Number')}</Placeholder>
                            <TextBox
                                value={phone}
                                onChangeText={onPhoneChange}
                                border={border}
                                keyboardType='phone-pad'
                                maxLength={10}
                            />
                        </>
                        :
                        <>
                            <Placeholder>{localize('Verification Code')}</Placeholder>
                            <TextBox
                                value={otp}
                                onChangeText={onOtpChange}
                                border={border}
                                keyboardType='numeric'
                                maxLength={6}
                                placeholder={localize("Enter the One Time Pin")}
                            />
                        </>
                }
                {
                    loading ?
                        <ActivityIndicator size="large" />
                        : null
                }
            </Body>
            <ConfirmBtn
                position="center"
                icon={page === 0 ? false : true}
                text={page === 0 ? localize("Request OTP") : localize("Verify OTP")}
                onPress={() => {
                    if (page === 0) {
                        verifyNumber(phone, setLoading, setPage, setBorder);
                    } else {
                        sendOtp(otp, phone, navigation, setBorder);
                    }
                }}
            />
        </Container>
    )
}

const Container = styled(View)`
    justify-content: space-between;
    flex: 1;
`
const Body = styled(View)`
    margin-vertical: 40;
    margin-horizontal: 25;
`
const Header = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    margin-bottom: 40px;
`
const HeaderText = styled(Text)`
    margin-left: 5px;
    font-size: 50px;
    font-weight: bold;
`
const Placeholder = styled(HeaderText)`
    font-size: 20px;
`
const TextBox = styled(TextInput) <{ border: number }>`
    background-color: #ddd;
    border-color: #f99;
    margin-top: 10px;
    margin-bottom: 20px;
    padding-horizontal: 20px;
    padding-vertical: 10px;
    border-radius: 10px;
    border-width: ${p => p.border}px;
`
