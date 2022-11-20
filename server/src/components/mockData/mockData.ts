import { IUser } from "../interfaces/usersInterfaces";
import { IAddress } from "../interfaces/addressesInterfaces";
import { IWaterMeter } from "../interfaces/waterMetersInterfaces";

const users: IUser[] = [
    {
        id: 1,
        firstName: 'Juhan',
        lastName: 'Juurikas',
        email: 'juhan@juurikas.ee',
        password: 'juurikas',//'$2b$10$MSSKAv0H4TCIgXRiJbYix.829Kt886rCVYgju9tGStiFndvh5WW62',
        personalNumber: 543654354,
        userRoleID: 1
    },
    {
        id: 2,
        firstName: 'Rita',
        lastName: 'Rebane',
        email: 'rita@rebane.ee',
        password: 'rita',
        personalNumber: 47102124354,
        userRoleID: 3
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
        country: "Eesti",
    },
    {
        id: 2,
        postalCode: 42301,
        houseNumber: 22,
        streetName: "Laulu tänav",
        county: "Harju maakond",
        apartmentNumber: 12,
        municipality: "Saue vald",
        country: "Eesti",
    },
];

const waterMeters: IWaterMeter[] = [
    {
        id: 1,
        serialNumber: "WM1",
        checkingDate: "12.10.2022",
        sealNumber: "SN1",
        type: "peakraan",
        addressId: 1
    }
]



export { users, addresses, waterMeters };