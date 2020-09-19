import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'
import { Voter } from '../model/voter'

export const server = 'http://18.224.184.235:8002'
const headers = {
    "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY1NDk2MCwicm9sZSI6bnVsbCwiaWF0IjoxNjAwNDM2MTIxLCJleHAiOjE2MDA0NDYxMjV9.6yuDVr5wO1Biv7FuEEPltCWvpsxgOdZIM8kKN0YajG8"
}

export const progressAPI = async ()=>{
    return Axios.get(server + '/progress', {
        params:{
            ward: await AsyncStorage.getItem('ward')
        },
        headers
    })
}

export const searchAPI = (query:string, ward:string)=>{
    return Axios.get(server + '/voters', {
        params:{
            search: query,
            ward: ward
        },
        headers
    })
}

export const getCitiesAPI = (district:string)=>{
    return Axios.get(server + '/cities', {
        params: {
            district: district,
        },
        headers
    })
}

export const getWardsAPI = (district:string, city:string)=>{
    return Axios.get(server + '/wards', {
        params: {
            district: district,
            city: city,
        },
        headers
    })
}

export const familyDetailsAPI = async (houseNumber:number)=>{
    return Axios.get(server + '/familyDetails', {
        params: {
            ward: await AsyncStorage.getItem('ward'),
            houseNumber: houseNumber,
        },
        headers
    })
}

export const increaseProgressAPI = async ()=>{
    return Axios.post(`${server}/campaignTrack`, {
        ward: await AsyncStorage.getItem('ward')
    },{headers: headers})
}

export const addVoterAPI = async ({
    name, guardian, dob, sex,
    houseName, houseNumber, voterId, email,
    mobileNumber, religion, cast, party,
    status, education, type, id
}: Voter)=>{
    const body = {
        name: name,
        guardian: guardian,
        houseNumber: houseNumber,
        houseName: houseName,
        gender: sex,
        voterId: voterId,
        district: await AsyncStorage.getItem('district'),
        city: await AsyncStorage.getItem('city'),
        ward: await AsyncStorage.getItem('ward'),
        constituency: "poonjar",
        dob: dob,
        email: email,
        phone: mobileNumber,
        religion: religion,
        cast: cast,
        party: party,
        status: status,
        education: education,
    }
    if (type === 'add'){
        Axios.post(`${server}/voters`, body, {headers: headers})
    } else if (type === 'detail'){
        Axios.put(`${server}/voters/${id}`, body, {headers: headers})
    }
}