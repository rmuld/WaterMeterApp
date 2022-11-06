import { RowDataPacket } from 'mysql2';

interface IAddress  {
    id?: number;
    postalCode: number;
    houseNumber: number;
    streetName: string;
    county: string;
    municipality: string;
    apartmentNumber?: number;
    country: string;
}

interface IAddressSQL extends IAddress, RowDataPacket {}

export { IAddressSQL, IAddress };