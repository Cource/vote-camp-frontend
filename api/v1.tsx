import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'
import { Voter } from '../model/voter'

export const server = 'http://18.224.184.235:8002'

export const progressAPI = async ()=>{
    return Axios.get(server + '/progress', {
        params:{
            ward: await AsyncStorage.getItem('ward')
        }
    })
}

export const searchAPI = (query:string)=>{
    return Axios.get(server + '/voters', {
        params:{
            search: query
        }
    })
}

export const getCitiesAPI = (district:string)=>{
    return Axios.get(server + '/cities', {
        params: {
            district: district,
        }
    })
}

export const getWardsAPI = (district:string, city:string)=>{
    return Axios.get(server + '/wards', {
        params: {
            district: district,
            city: city,
        }
    })
}

export const familyDetailsAPI = async (houseNumber:number)=>{
    return Axios.get(server + '/familyDetails', {
        params: {
            ward: await AsyncStorage.getItem('ward'),
            houseNumber: houseNumber,
        }
    })
}

export const increaseProgressAPI = async ()=>{
    return Axios.post(`${server}/campaignTrack`, {
        ward: await AsyncStorage.getItem('ward')
    })
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
        Axios.post(`${server}/voters`, body)
    } else if (type === 'detail'){
        Axios.put(`${server}/voters/${id}`, body)
    }
}