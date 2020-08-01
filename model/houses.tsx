export const server = 'http://192.168.0.10:8002'

export interface Member{
    name: String,
    voterId: String,
    guardian: String,
    gender: String,
}

export interface House{
    houseName: String,
    houseNumber: Number,
}
