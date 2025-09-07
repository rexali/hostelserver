export type ProfileType = {
    id?: number,
    firstName?: string,
    lastName?: string,
    image: string;
    phone: string,
    dateOfBirth?: Date,
    localGovt?: string,
    address: string
    state: string,
    country: string,
    UserId: number | undefined;
    createdAt?: Date,
    updatedAt?: Date
}