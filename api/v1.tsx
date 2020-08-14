import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'

export const server = 'http://18.224.184.235:8002'

export const progressAPI = async ()=>{
    return Axios.get(server + '/progress', {
        params:{
            ward: await AsyncStorage.getItem('ward')
        }
    })
}

export const searchAPI = async (query:string)=>{
    return Axios.get(server + '/voters', {
        params:{
            search: query
        }
    })
}

export const getCitiesAPI = async (district:string)=>{
    return Axios.get(server + '/cities', {
        params: {
            district: district,
        }
    })
}

export const getWardsAPI = async (district:string, city:string)=>{
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
