export interface Voter {
    name?: string,
    guardian?: string,
    age?: string,
    gender: string
    sex?: 'M'|'F'|'T',
    houseName?: string,
    houseNumber?: string,
    voterId?: string,
    email?: string,
    mobileNumber?: string,
    religion?: string,
    party?: string,
    status?: string,
    education?: string,
    type?: 'add'|'detail',
    id?: number
}
export interface House {
    houseName: string,
    houseNumber: number,
}