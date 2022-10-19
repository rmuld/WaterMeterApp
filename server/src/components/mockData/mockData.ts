import { IUser } from "../interfaces/usersInterfaces";
import { IAddress } from "../interfaces/addressesInterfaces";
import { IWaterMeter } from "../interfaces/waterMetersInterfaces";

const users: IUser[] = [
    {
        id: 1,
        firstName: 'Juhan',
        lastName: 'Juurikas',
        email: 'juhan@juurikas.ee',
        password: 'juhan',
        personalNumber: 543654354,
        phone: "54635454",
        role: "Admin"
    },
    {
        id: 2,
        firstName: 'Rita',
        lastName: 'Rebane',
        email: 'rita@rebane.ee',
        password: 'rita',
        personalNumber: 47102124354,
        phone: "5015454",
        role: "User"
    },
];

const addresses: IAddress[] = [
    {
        id: 1,
        postalCode: 12301,
        houseNumber: 99,
        streetName: "Tuha tänav",
        municipality: "Tallinn",
        county: "Harju maakond",
    },
    {
        id: 2,
        postalCode: 42301,
        houseNumber: 22,
        streetName: "Laulu tänav",
        county: "Harju maakond",
        apartmentNumber: 12,
        municipality: "Saue vald"
    },
];

const waterMeters: IWaterMeter[] = [
    {
        id: 1,
        serialNumber: "WM1",
        checkingDate: "12.10.2022",
        sealNumber: "SN1",
        type: "main",
        addressId: 1
    }
]



export { users, addresses, waterMeters };