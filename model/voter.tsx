export interface Voter {
    name?: string,
    guardian?: string,
    dob?: string,
    sex?: 'M'|'F'|'T',
    houseName?: string,
    houseNumber?: string,
    voterId?: string,
    email?: string,
    mobileNumber?: string,
    religion?: string,
    cast?: string,
    party?: string,
    status?: string,
    education?: string,
    type?: 'add'|'detail',
    id?: number
}