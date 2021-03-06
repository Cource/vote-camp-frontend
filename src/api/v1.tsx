import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'
import { Voter } from '../Design/voter'

export const server = 'http://18.224.184.235:8002'

//logging
// Axios.interceptors.request.use(request => {
//     console.log(`[${request.method}] ${request.url}\nData: ${JSON.stringify(request.params || request.data)}\n`)
//     return request
// })

export const housesLeftAPI = async () => {
    return Axios.get(server + '/home', {
        headers: {
            Authorization: await AsyncStorage.getItem('auth')
        }
    })
}

export const setLocationAPI = async (lattitude: number, longitude: number) => {
    Axios.post(server + '/location', {
        latitude: lattitude,
        longitude: longitude
    }, {
        headers: {
            Authorization: await AsyncStorage.getItem('auth')
        }
    })
}

export const reqOtpAPI = async (phone: string) => {
    return Axios.post(server + '/otp', {
        mobileNumber: phone
    })
}

export const verifyOtpAPI = async (phone: string, otp: string) => {
    return Axios.put(server + '/otp', {
        mobileNumber: phone,
        otp: otp
    })
}

export const progressAPI = async () => {
    return Axios.get(server + '/progress', {
        params: {
            wardId: await AsyncStorage.getItem('wardId'),
            districtId: await AsyncStorage.getItem('districtId')
        },
        headers: {
            Authorization: await AsyncStorage.getItem('auth')
        }
    })
}

export const searchAPI = async (query: string) => {
    return Axios.get(server + '/voters', {
        params: {
            search: query
        },
        headers: {
            Authorization: await AsyncStorage.getItem('auth')
        }

    })
}

export const profileAPI = async (): Promise<{ data: { name: string, phone: string } }> => {
    return Axios.get(server + '/users/' + await AsyncStorage.getItem('uid'), {
        headers: {
            Authorization: await AsyncStorage.getItem('auth')
        }
    })
}

interface area {
    data: {
        id: number,
        name: string
    }[]
}

export const getCitiesAPI = async (district: string): Promise<area> => {
    return Axios.get(server + '/cities', {
        params: {
            district: district,
        },
        headers: {
            Authorization: await AsyncStorage.getItem('auth')
        }
    })
}

export const getWardsAPI = async (districtId: number, cityId: number): Promise<area> => {
    return Axios.get(server + '/wards', {
        params: {
            districtId: districtId,
            cityId: cityId,
        },
        headers: {
            Authorization: await AsyncStorage.getItem('auth')
        }
    })
}

export const familyDetailsAPI = async (houseNumber: number) => {
    return Axios.get(server + '/familyDetails', {
        params: {
            wardId: await AsyncStorage.getItem('wardId'),
            houseNumber: houseNumber,
        },
        headers: {
            Authorization: await AsyncStorage.getItem('auth')
        }
    })
}

export const increaseProgressAPI = async (voterIdArray: string[]) => {
    return Axios.post(`${server}/campaignTrack`, {
        wardId: await AsyncStorage.getItem('wardId'),
        districtId: await AsyncStorage.getItem('districtId'),
        voterIdArray: voterIdArray
    }, {
        headers: {
            Authorization: await AsyncStorage.getItem('auth')
        }
    })
}

export const addVoterAPI = async (data: Voter) => {
    const body = {
        ...data,
        verified: true,
        gender: `${data.sex} / ${data.age}`,
    }
    switch (data.type) {
        case 'add':
            Axios.post(`${server}/voters`, body, {
                headers: {
                    Authorization: await AsyncStorage.getItem('auth')
                }
            })
            break
        case 'detail':
            Axios.put(`${server}/voters/${data.id}`, body, {
                headers: {
                    Authorization: await AsyncStorage.getItem('auth')
                }
            })
            break
    }
}