export interface Member{
    name: string,
    voterId: string,
    guardian: string,
    gender: string,
    houseName: string,
    houseNumber: string,
    dob: Date,
    id: number,
}

export interface House{
    houseName: string,
    houseNumber: number,
}
