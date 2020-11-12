export interface Voter {
    name?: string,
    guardian?: string,
    age?: string,
    gender?: string
    sex?: 'M'|'F'|'T',
    houseName?: string,
    houseNumber?: string,
    voterId?: string,
    whatsAppNumber?: string,
    mobileNumber?: string,
    religion?: string,
    cast?: string,
    party?: string,
    division?: string,
    habits?: string,
    cash?: string,
    education?: string,
    type?: 'add'|'detail',
    id?: number,
    verified?: Boolean,
    visitCount?: number,
    remarks?: string,
    voteStatus?: string,
    postalType?: string,
    keyVoter?: boolean
}
export interface House {
    houseName: string,
    houseNumber: number,
}